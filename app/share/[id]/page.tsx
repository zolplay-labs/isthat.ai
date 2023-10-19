import { clerkClient, currentUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GameLayout } from '~/app/_game/components/GameLayout'
import { ResultDisplay } from '~/app/_game/components/ResultDisplay'
import { filterUser } from '~/app/_game/helpers/filterUser'
import { getResultById } from '~/app/_game/helpers/getResultById'
import { getResultTier } from '~/app/_game/helpers/getResultTier'
import { getTestId } from '~/app/_game/helpers/getTestId'
import { db } from '~/db'
import { userScores } from '~/db/schema'

import { Actions } from './_components/Actions'

export const runtime = 'edge'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  let result
  try {
    result = await getResultById(params.id)
  } catch (error) {
    console.error(error)
    return {}
  }

  const clerkUser = await clerkClient.users.getUser(result.score.userId)
  const user = filterUser(clerkUser)
  const testId = getTestId({ date: result.score.createdAt })
  const tier = getResultTier(
    result.score.score,
    result.score.total,
    result.score.time
  )
  const title = user.name ? `${user.name} on isthat.ai` : undefined
  const description = `I scored ${tier.title} on Test #${testId} 🕵️`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  } satisfies Metadata
}

export default async function Share({ params }: { params: { id: string } }) {
  let result
  try {
    result = await getResultById(params.id)
  } catch (error) {
    console.error(error)
    return notFound()
  }

  const clerkUser = await clerkClient.users.getUser(result.score.userId)
  const user = filterUser(clerkUser)

  const viewingUser = await currentUser()
  let viewingUserFinishedCurrentTest = false
  if (viewingUser?.id) {
    const [viewingUserScore] = await db
      .select()
      .from(userScores)
      .where(eq(userScores.userId, viewingUser.id))
      .orderBy(desc(userScores.createdAt))
      .limit(1)
    if (viewingUserScore?.createdAt) {
      viewingUserFinishedCurrentTest =
        getTestId({ date: viewingUserScore.createdAt }) ===
        getTestId({ date: new Date() })
    }
  }

  return (
    <div className="cursor-normal font-press-start-2p">
      <GameLayout
        title={`~ ${
          result.score.userId === viewingUser?.id ? 'MY' : 'THEIR'
        } RESULT ~`}
        className="h-full w-full"
      >
        <ResultDisplay
          userScore={result.score}
          user={user}
          testId={result.testId}
          actions={
            <Actions
              viewingUserFinishedCurrentTest={viewingUserFinishedCurrentTest}
            />
          }
        />
      </GameLayout>
    </div>
  )
}

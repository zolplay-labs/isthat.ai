import { clerkClient, currentUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { GameLayout } from '~/app/_game/components/GameLayout'
import { ResultDisplay } from '~/app/_game/components/ResultDisplay'
import { filterUser } from '~/app/_game/helpers/filterUser'
import { getResultTier } from '~/app/_game/helpers/getResultTier'
import { getTestId } from '~/app/_game/helpers/getTestId'
import { db } from '~/db'
import { userScores } from '~/db/schema'
import { sqids } from '~/lib/sqids'

import { Actions } from './_components/Actions'

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const [id] = sqids.decode(params.id)
  if (!id) return {}
  const [userScore] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.id, id))
  if (!userScore) return {}

  const clerkUser = await clerkClient.users.getUser(userScore.userId)
  const user = filterUser(clerkUser)
  const testId = getTestId({ date: userScore.createdAt })
  const tier = getResultTier(userScore.score, userScore.total, userScore.time)

  return {
    title: user.name ? `${user.name} on isthat.ai` : undefined,
    description: `I scored ${tier.title} on Test #${testId} 🕵️`,
  } satisfies Metadata
}

export default async function Share({ params }: { params: { id: string } }) {
  const [id] = sqids.decode(params.id)
  if (!id) return notFound()
  const [userScore] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.id, id))
  if (!userScore) return notFound()

  const clerkUser = await clerkClient.users.getUser(userScore.userId)
  const user = filterUser(clerkUser)

  const testId = getTestId({ date: userScore.createdAt })

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
          userScore.userId === viewingUser?.id ? 'MY' : 'THEIR'
        } RESULT ~`}
        className="h-full w-full"
      >
        <ResultDisplay
          userScore={userScore}
          user={user}
          testId={testId}
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

import { clerkClient } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

import { GameLayout } from '~/app/_game/components/GameLayout'
import { ResultDisplay } from '~/app/_game/components/ResultDisplay'
import { filterUser } from '~/app/_game/helpers/filterUser'
import { getTestId } from '~/app/_game/helpers/getTestId'
import { db } from '~/db'
import { userScores } from '~/db/schema'
import { sqids } from '~/lib/sqids'

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

  const testId = getTestId(userScore.createdAt)

  return (
    <div className="cursor-normal font-press-start-2p">
      <GameLayout header={<span>~ Result ~</span>} className="h-full w-full">
        <ResultDisplay
          userScore={userScore}
          user={user}
          testId={testId}
          hasBattleButton
        />
      </GameLayout>
    </div>
  )
}

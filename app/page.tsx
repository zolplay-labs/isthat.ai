import { currentUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'

import { db } from '~/db'
import { userScores } from '~/db/schema'
import { env } from '~/env.mjs'

import { Game } from './_game/Game'
import { filterUser } from './_game/helpers/filterUser'
import { getNextTestStartTime } from './_game/helpers/getNextTestStartTime'
import { getQuestions } from './_game/helpers/getQuestions'
import { getTestId } from './_game/helpers/getTestId'

const fetchUser = async () => {
  const user = await currentUser()
  if (!user) return null
  return {
    ...filterUser(user),
    userId: user.id,
  }
}

const fetchUserScoreInCurrentTest = async ({
  userId,
  testId,
}: {
  userId: string
  testId: number
}) => {
  const [latestUserScoreRow] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.userId, userId))
    .orderBy(desc(userScores.createdAt))
    .limit(1)
  if (!latestUserScoreRow) return null
  const isScoreInCurrentTest =
    getTestId({ date: latestUserScoreRow.createdAt }) === testId
  if (!isScoreInCurrentTest) return null
  return latestUserScoreRow
}

export default async function Home() {
  const now = new Date()

  const testId = getTestId({ date: now })
  const nextTestStartTime = getNextTestStartTime({
    now,
    nextTestId: testId + 1,
  })

  const user = await fetchUser()
  const isTrial = user === null
  const userScoreInCurrentTest = user
    ? await fetchUserScoreInCurrentTest({ userId: user.userId, testId })
    : null

  const images = await getQuestions({
    length: isTrial ? 1 : env.NEXT_PUBLIC_QUESTIONS_PER_CHALLENGE,
    testId,
    now,
  })

  return (
    <Game
      user={user}
      images={images}
      userScoreInCurrentTest={userScoreInCurrentTest}
      testId={testId}
      nextTestStartTime={nextTestStartTime}
    />
  )
}

import { desc, eq } from 'drizzle-orm'

import { db } from '~/db'
import { userScores } from '~/db/schema'

import { getTestId } from './getTestId'

export type FetchUserScoreInCurrentTestParams = {
  userId: string
  testId: number
}

export const fetchUserScoreInCurrentTest = async ({
  userId,
  testId,
}: FetchUserScoreInCurrentTestParams) => {
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

import { eq } from 'drizzle-orm'

import { db } from '~/db'
import { userScores } from '~/db/schema'
import { redis } from '~/lib/redis'
import { sqids } from '~/lib/sqids'

import { getTestId } from './getTestId'

type Result = {
  testId: number
  score: typeof userScores.$inferSelect
}

export const getResultById = async (id: string): Promise<Result> => {
  const cachedResult = await redis?.get<Result>(
    `${process.env.VERCEL_ENV ?? 'dev'}:result:${id}`
  )
  if (cachedResult) return cachedResult

  const [decodedId] = sqids.decode(id)
  if (!decodedId) throw new Error('Invalid ID')

  const [userScore] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.id, decodedId))
  if (!userScore) throw new Error('Result not found')

  const testId = getTestId({ date: userScore.createdAt })

  const result = {
    testId,
    score: userScore,
  }

  await redis?.set(`result:${id}`, result)

  return result
}

import { type InferModel, sql } from 'drizzle-orm'

import { db } from '.'
import { config, questions } from './schema'

export type Config = Omit<InferModel<typeof config, 'select'>, 'id'>
export const fetchConfig = async (): Promise<Config> => {
  const [configData] = await db.select().from(config)
  return {
    releaseDate: configData?.releaseDate || new Date('2023-7-25'),
    activeQuestionsLimit: configData?.activeQuestionsLimit || 0,
    questionsPerChallenge: configData?.questionsPerChallenge || 0,
  }
}

export const fetchQuestionCount = async () => {
  return (
    (await db.select({ count: sql<number>`count(*)` }).from(questions))[0]
      ?.count || 0
  )
}

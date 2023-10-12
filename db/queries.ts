import { sql } from 'drizzle-orm'

import { db } from '.'
import { config, questions } from './schema'

export type Config = Omit<typeof config.$inferSelect, 'id'>
export const fetchConfig = async (): Promise<Config> => {
  const [configData] = await db.select().from(config)
  return {
    activeQuestionsLimit: configData?.activeQuestionsLimit || 0,
    questionsPerChallenge: configData?.questionsPerChallenge || 0,
    refreshIntervalHours: configData?.refreshIntervalHours || 0,
  }
}

export const fetchQuestionCount = async () => {
  return (
    (await db.select({ count: sql<number>`count(*)` }).from(questions))[0]
      ?.count || 0
  )
}

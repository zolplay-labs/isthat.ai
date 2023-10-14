import { sql } from 'drizzle-orm'

import { db } from '.'
import { questions } from './schema'

export const fetchQuestionCount = async () => {
  return (
    (await db.select({ count: sql<number>`count(*)` }).from(questions))[0]
      ?.count || 0
  )
}

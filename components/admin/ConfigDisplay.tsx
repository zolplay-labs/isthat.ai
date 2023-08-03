import { sql } from 'drizzle-orm'
import React from 'react'

import { db } from '~/db'
import { config, questions } from '~/db/schema'

export async function ConfigDisplay() {
  const [configData] = await db.select().from(config)
  const questionCount =
    (await db.select({ count: sql<number>`count(*)` }).from(questions))[0]
      ?.count || 0

  return (
    <div className="space-x-2 text-center text-sm sm:flex">
      <div>
        <span className="font-bold">Release Date: </span>
        <span>{configData?.releaseDate?.toDateString()}</span>
      </div>
      <div>
        <span className="font-bold">Active Questions Limit: </span>
        <span>{configData?.activeQuestionsLimit}</span>
      </div>
      <div>
        <span className="font-bold">Questions Per Challenge: </span>
        <span>{configData?.questionsPerChallenge}</span>
      </div>
      <div>
        <span className="font-bold">Total Questions: </span>
        <span>{questionCount}</span>
      </div>
    </div>
  )
}

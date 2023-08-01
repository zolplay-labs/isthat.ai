import React from 'react'

import { db } from '~/db'
import { config } from '~/db/schema'

export async function ConfigDisplay() {
  const [configData] = await db.select().from(config)

  return (
    <div className="space-x-2 text-sm sm:flex">
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
    </div>
  )
}

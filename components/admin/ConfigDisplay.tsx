import { type InferModel } from 'drizzle-orm'
import React from 'react'

import { type config } from '~/db/schema'

export function ConfigDisplay({
  configData,
  questionCount,
}: {
  configData: InferModel<typeof config, 'select'> | undefined
  questionCount: number
}) {
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

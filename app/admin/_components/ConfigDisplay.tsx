import React from 'react'

import { type Config } from '~/db/queries'

export function ConfigDisplay({
  configData,
  questionCount,
}: {
  configData: Config
  questionCount: number
}) {
  return (
    <div className="space-x-2 text-center text-sm sm:flex">
      <div>
        <span className="font-bold">Release Date: </span>
        <span>{configData.releaseDate.toDateString()}</span>
      </div>
      <div>
        <span className="font-bold">Active Questions Limit: </span>
        <span>{configData.activeQuestionsLimit}</span>
      </div>
      <div>
        <span className="font-bold">Questions Per Challenge: </span>
        <span>{configData.questionsPerChallenge}</span>
      </div>
      <div>
        <span className="font-bold">Total Questions: </span>
        <span>{questionCount}</span>
      </div>
    </div>
  )
}

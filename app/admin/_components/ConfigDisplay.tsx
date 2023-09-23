import { type Config } from '~/db/queries'

export function ConfigDisplay({
  config,
  questionCount,
}: {
  config: Config
  questionCount: number
}) {
  return (
    <div className="space-x-2 text-center text-xs sm:flex">
      <div>
        <span className="font-bold">Release Date: </span>
        <span>{config.releaseDate.toDateString()}</span>
      </div>
      <div>
        <span className="font-bold">Active Questions Limit: </span>
        <span>{config.activeQuestionsLimit}</span>
      </div>
      <div>
        <span className="font-bold">Questions Per Challenge: </span>
        <span>{config.questionsPerChallenge}</span>
      </div>
      <div>
        <span className="font-bold">Total Questions: </span>
        <span>{questionCount}</span>
      </div>
    </div>
  )
}

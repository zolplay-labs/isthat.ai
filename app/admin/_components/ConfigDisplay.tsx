import { type Config } from '~/db/queries'

export function ConfigDisplay({
  config,
  questionCount,
}: {
  config: Config
  questionCount: number
}) {
  return (
    <div className="space-x-2 text-center text-sm sm:flex">
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
      <div>
        <span className="font-bold">Refresh Interval Hours: </span>
        <span>{config.refreshIntervalHours}</span>
      </div>
    </div>
  )
}

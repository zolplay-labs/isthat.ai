import dayjs from '~/lib/dayjs'

export function getNextTestStartTime(options: {
  nextTestId: number
  now: Date
  refreshesPerDay: number
  refreshIntervalInHours: number
}) {
  const today = dayjs(options.now).startOf('day')
  const idRemainder = options.nextTestId % options.refreshesPerDay
  const processedRefreshes =
    idRemainder === 0 ? options.refreshesPerDay : idRemainder
  const processedHours =
    (processedRefreshes - 1) * options.refreshIntervalInHours
  const result = (
    processedHours === 0
      ? today.add(1, 'day')
      : today.set('hour', processedHours)
  ).add(1, 'second')
  return result.toDate()
}

import { env } from '~/env.mjs'
import dayjs from '~/lib/dayjs'

type GetNextTestStartTimeParams = {
  nextTestId: number
  now?: Date
  refreshIntervalInHours?: number
}

export const getNextTestStartTime = ({
  nextTestId,
  now = new Date(),
  refreshIntervalInHours = env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS,
}: GetNextTestStartTimeParams) => {
  const today = dayjs(now).startOf('day')
  const refreshesPerDay = Math.ceil(24 / refreshIntervalInHours)
  const idRemainder = nextTestId % refreshesPerDay
  const processedRefreshes = idRemainder === 0 ? refreshesPerDay : idRemainder
  const processedHours = (processedRefreshes - 1) * refreshIntervalInHours
  const result =
    processedHours === 0
      ? today.add(1, 'day')
      : today.set('hour', processedHours)
  return result.toDate()
}

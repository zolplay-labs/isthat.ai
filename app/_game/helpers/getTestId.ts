import { env } from '~/env.mjs'
import dayjs from '~/lib/dayjs'

type GetTestIdParams = {
  date: Date
  releaseDate?: string
  refreshIntervalHours?: number
}

export const getTestId = ({
  date,
  releaseDate = env.NEXT_PUBLIC_RELEASE_DATE,
  refreshIntervalHours = env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS,
}: GetTestIdParams) => {
  const dayjsDate = dayjs(date)
  const releaseDateDayjs = dayjs(releaseDate, 'YYYYMMDD')
  const refreshesPerDay = Math.ceil(24 / refreshIntervalHours)
  const diffDays = dayjsDate.diff(releaseDateDayjs, 'days')
  const hour = dayjsDate.hour()
  let restProcessedIds = Math.ceil(hour / refreshIntervalHours)
  if (hour % refreshIntervalHours === 0) {
    restProcessedIds++
  }
  return diffDays * refreshesPerDay + restProcessedIds
}

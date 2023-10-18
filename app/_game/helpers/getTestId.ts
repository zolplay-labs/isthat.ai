import { env } from '~/env.mjs'
import dayjs from '~/lib/dayjs'

export const refreshesPerDay = Math.ceil(
  24 / env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS
)

export const getTestId = (date: Date) => {
  const dayjsDate = dayjs(date)
  const releaseDateDayjs = dayjs(env.NEXT_PUBLIC_RELEASE_DATE, 'YYYYMMDD')
  const diffDays = dayjsDate.diff(releaseDateDayjs, 'days')
  const hour = dayjsDate.hour()
  let restProcessedIds = Math.ceil(
    hour / env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS
  )
  if (hour % env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS === 0) {
    restProcessedIds++
  }
  return diffDays * refreshesPerDay + restProcessedIds
}

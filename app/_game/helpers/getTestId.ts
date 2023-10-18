import { env } from '~/env.mjs'
import dayjs from '~/lib/dayjs'

export const getTestId = (date: Date) => {
  const dayjsDate = dayjs(date)
  const releaseDateDayjs = dayjs(env.NEXT_PUBLIC_RELEASE_DATE, 'YYYYMMDD')
  const diffDays = dayjsDate.diff(releaseDateDayjs, 'days')
  const idsPerDay = Math.ceil(24 / env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS)
  const restProcessedIds = Math.ceil(
    dayjsDate.hour() / env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS
  )
  return diffDays * idsPerDay + restProcessedIds
}

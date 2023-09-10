import { type Config } from '~/db/queries'

const MS_IN_A_DAY = 86400000

export const calcDay = (config: Config, endDate: Date) => {
  const day = Math.floor(
    (endDate.getTime() - config.releaseDate.getTime()) / MS_IN_A_DAY
  )
  return day
}

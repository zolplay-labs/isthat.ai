import { useMediaQuery } from 'usehooks-ts'

export const useIsPC = () => {
  const isPC = useMediaQuery('(min-width: 640px)')
  return isPC
}

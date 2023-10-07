import { useMedia } from 'react-use'

export const useIsPC = () => {
  const isPC = useMedia('(min-width: 640px)')
  return isPC
}

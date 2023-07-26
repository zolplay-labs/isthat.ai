import { useEffect, useState } from 'react'

export const useMount = (fn: () => void) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
      fn?.()
    }
  }, [isMounted])
}

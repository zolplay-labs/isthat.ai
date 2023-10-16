import { useIsomorphicLayoutEffect } from 'framer-motion'
import { useRef } from 'react'

export const useMount = (fn: () => any) => {
  useIsomorphicLayoutEffect(() => {
    fn()
  }, [])
}

export const useBeforeMount = (fn: () => any) => {
  const fnRef = useRef(fn)
  fnRef.current = fn
  const onceRef = useRef(true)
  if (onceRef.current) {
    fnRef.current()
    onceRef.current = false
  }
}

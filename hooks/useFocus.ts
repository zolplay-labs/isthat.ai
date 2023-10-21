import { useEffect } from 'react'

export const useFocus = (onFocus: () => void) => {
  useEffect(() => {
    window.addEventListener('focus', onFocus)
    return () => {
      window.removeEventListener('focus', onFocus)
    }
  }, [])
}

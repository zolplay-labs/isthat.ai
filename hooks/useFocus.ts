import { useEffect } from 'react'

export const useFocus = (onFocus: () => void, deps?: React.DependencyList) => {
  useEffect(
    () => {
      window.addEventListener('focus', onFocus)
      return () => {
        window.removeEventListener('focus', onFocus)
      }
    },
    deps?.length ? deps : []
  )
}

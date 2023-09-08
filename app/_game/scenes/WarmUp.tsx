import { useMount } from 'react-use'

import { useScene } from '~/stores/Scene.store'

export function WarmUp() {
  const { switchScene } = useScene()

  useMount(() => {
    setTimeout(() => {
      localStorage.setItem('hasWarmedUp', 'true')
      switchScene('READY')
    }, 3000)
  })

  return <div>WarmUp...</div>
}

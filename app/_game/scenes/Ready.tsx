import { useMount } from 'react-use'

import { useScene } from '~/stores/Scene.store'

export function Ready() {
  const { switchScene } = useScene()

  useMount(() => {
    setTimeout(() => {
      switchScene('PLAY')
    }, 3000)
  })

  return <div>Ready (3s)</div>
}

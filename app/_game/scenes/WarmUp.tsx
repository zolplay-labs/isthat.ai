import { useMount } from 'react-use'

import { useScene } from '~/stores/Scene.store'

import { GameLayout } from '../components/GameLayout'

export function WarmUp() {
  const { switchScene } = useScene()

  useMount(() => {
    setTimeout(() => {
      localStorage.setItem('hasWarmedUp', 'true')
      switchScene('READY')
    }, 3000)
  })

  return <GameLayout>WarmUp...</GameLayout>
}

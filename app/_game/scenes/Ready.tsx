import { useMount } from 'react-use'

import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'

export function Ready() {
  const { switchScene } = useScene()
  const { sceneProps } = useSceneProps()

  useMount(() => {
    setTimeout(() => {
      switchScene('PLAY')
    }, 3000)
  })

  return (
    <GameLayout header={<span>(0/{sceneProps['PLAY'].total})</span>}>
      Ready (3s)
    </GameLayout>
  )
}

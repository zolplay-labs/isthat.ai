import { useEffect } from 'react'
import { useMount } from 'react-use'

import { useMotionProgress } from '~/hooks/useMotionProgress'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { LoadingComputer } from '../components/LoadingComputer'

export function Loading() {
  const { switchScene } = useScene()
  const { sceneProps } = useSceneProps()

  const { progress, startProgress, isProgressEnd } = useMotionProgress({
    end: 100,
    duration: 3,
  })

  useMount(async () => {
    await startProgress()
  })

  useEffect(() => {
    if (isProgressEnd) {
      switchScene(sceneProps['LOADING'].hasUserScoreToday ? 'RESULT' : 'MENU')
    }
  }, [sceneProps, isProgressEnd])

  return (
    <div className="flex h-[100dvh] cursor-loading items-center justify-center">
      <LoadingComputer progress={progress} />
    </div>
  )
}

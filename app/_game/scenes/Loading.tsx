import { animate, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMount } from 'react-use'

import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { LoadingComputer } from '../components/LoadingComputer'

export function Loading() {
  const { switchScene } = useScene()
  const { sceneProps } = useSceneProps()

  const count = useMotionValue(0)
  const progress = useTransform(count, Math.round)
  const [isAnimationFinished, setIsAnimationFinished] = useState(false)

  useMount(async () => {
    await animate(count, 100, { duration: 3 })
    setIsAnimationFinished(true)
  })

  useEffect(() => {
    if (isAnimationFinished) {
      switchScene(sceneProps['LOADING'].hasUserScoreToday ? 'RESULT' : 'MENU')
    }
  }, [sceneProps, isAnimationFinished])

  return (
    <div className="flex h-[100dvh] items-center justify-center">
      <LoadingComputer progress={progress} />
    </div>
  )
}

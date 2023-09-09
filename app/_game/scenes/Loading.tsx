import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMount } from 'react-use'

import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

export function Loading() {
  const { switchScene } = useScene()
  const { sceneProps } = useSceneProps()

  const count = useMotionValue(0)
  const progress = useTransform(count, Math.round)
  const [animationFinish, setAnimationFinish] = useState(false)

  useMount(async () => {
    await animate(count, 100, { duration: 3 })
    setAnimationFinish(true)
  })

  useEffect(() => {
    if (animationFinish) {
      switchScene(sceneProps['LOADING'].hasUserScoreToday ? 'RESULT' : 'MENU')
    }
  }, [sceneProps, animationFinish])

  return (
    <>
      <div>Loading</div>
      <div>
        <motion.span>{progress}</motion.span>
        <span>%</span>
      </div>
    </>
  )
}

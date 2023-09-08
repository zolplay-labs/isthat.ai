import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useMount } from 'react-use'

import { useScene } from '~/stores/Scene.store'

export function Loading() {
  const { switchScene } = useScene()

  const count = useMotionValue(0)
  const progress = useTransform(count, Math.round)

  useMount(async () => {
    await animate(count, 100, { duration: 3 })
    switchScene('MENU')
  })

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

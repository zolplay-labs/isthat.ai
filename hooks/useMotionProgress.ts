import { animate, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'

import { useMotionValueState } from './useMotionValueState'

export const useMotionProgress = ({
  end,
  duration,
}: {
  end: number
  duration: number
}) => {
  const count = useMotionValue(0)
  const progress = useTransform(count, Math.round)
  const [isProgressEnd, setIsProgressEnd] = useState(false)
  const progressState = useMotionValueState(progress)

  const startProgress = async () => {
    await animate(count, end, { duration })
    setIsProgressEnd(true)
  }

  return { progress, startProgress, isProgressEnd, progressState }
}

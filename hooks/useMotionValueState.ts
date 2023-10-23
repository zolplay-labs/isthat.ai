import { type MotionValue, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'

export const useMotionValueState = <T>(motionValue: MotionValue<T>) => {
  const [state, setState] = useState(motionValue.get())
  useMotionValueEvent(motionValue, 'change', (latest) => {
    setState(latest)
  })
  return state
}

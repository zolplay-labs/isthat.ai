import { clsxm } from '@zolplay/utils'
import { cva } from 'class-variance-authority'
import { motion, type PanInfo } from 'framer-motion'
import { useCallback, useState } from 'react'

import { useIsPC } from '~/hooks/useIsPC'

export type SwipeSide = 'left' | 'right' | 'none'
interface TinderCardProps {
  idx: number
  active: boolean
  className?: string
  onSwiped: (swipe: SwipeSide) => void
  onSwiping: (swipe: SwipeSide) => void
  children: React.ReactNode
}

const card = cva(
  [
    'absolute w-auto h-auto will-change-transform flex flex-col justify-center items-center cursor-move active:cursor-moving',
  ],
  {
    variants: {
      rotate: {
        none: '',
        left: ['-rotate-4'],
        right: ['rotate-4'],
      },
    },
    defaultVariants: {
      rotate: 'none',
    },
  }
)

const SWIPING_THRESHOLD = 120
const SWIPING_THRESHOLD_PHONE = 50
export function TinderCard({
  idx,
  onSwiped,
  onSwiping,
  active,
  className,
  children,
}: TinderCardProps) {
  const isPC = useIsPC()
  const swipingThreshold = isPC ? SWIPING_THRESHOLD : SWIPING_THRESHOLD_PHONE

  const [leaveX, setLeaveX] = useState(0)

  const handleDragEnd = useCallback(
    (_e: any, info: PanInfo) => {
      if (info.offset.x > swipingThreshold) {
        setLeaveX(1000)
        onSwiped('right')
      }
      if (info.offset.x < -swipingThreshold) {
        setLeaveX(-1000)
        onSwiped('left')
      }
    },
    [idx, onSwiped]
  )

  const handleDrag = useCallback(
    (_e: any, info: PanInfo) => {
      if (info.offset.x > swipingThreshold) {
        onSwiping('right')
      } else if (info.offset.x < -swipingThreshold) {
        onSwiping('left')
      } else {
        onSwiping('none')
      }
    },
    [idx, onSwiped]
  )

  return (
    <>
      {active ? (
        <motion.div
          drag
          dragSnapToOrigin
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          initial={{
            scale: 1,
          }}
          whileTap={{
            scale: 1.25,
          }}
          animate={{
            scale: 1.05,
            rotate: `${idx % 2 === 0 ? 4 : -4}deg`,
          }}
          exit={{
            x: leaveX,
            y: 0,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={clsxm(card(), className)}
          style={{ zIndex: 9999 }}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          className={clsxm(
            card({ rotate: idx === 0 ? 'right' : 'left' }),
            'scale-95 transform-gpu',
            className
          )}
          style={{
            zIndex: 999 - idx,
          }}
        >
          {children}
        </motion.div>
      )}
    </>
  )
}

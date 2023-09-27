import { clsxm } from '@zolplay/utils'
import { cva } from 'class-variance-authority'
import { motion, type PanInfo } from 'framer-motion'
import { useCallback, useState } from 'react'

export type SwipeType = 'left' | 'right' | 'none'
interface TinderCardProps {
  idx: number
  active: boolean
  className?: string
  onSwiped: (swipe: SwipeType) => void
  onSwiping: (swipe: SwipeType) => void
  children: React.ReactNode
}

const card = cva(
  [
    'absolute h-[500px] w-[600px] will-change-transform flex rounded-2xl flex-col justify-center items-center cursor-grab',
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

const SWIPING_THRESHOLD = 200
export function TinderCard({
  idx,
  onSwiped,
  onSwiping,
  active,
  className,
  children,
}: TinderCardProps) {
  const [leaveX, setLeaveX] = useState(0)

  const handleDragEnd = useCallback(
    (_e: any, info: PanInfo) => {
      if (info.offset.x > SWIPING_THRESHOLD) {
        setLeaveX(1000)
        onSwiped('right')
      }
      if (info.offset.x < -SWIPING_THRESHOLD) {
        setLeaveX(-1000)
        onSwiped('left')
      }
    },
    [idx, onSwiped]
  )

  const handleDrag = useCallback(
    (_e: any, info: PanInfo) => {
      if (info.offset.x > SWIPING_THRESHOLD) {
        onSwiping('right')
      } else if (info.offset.x < -SWIPING_THRESHOLD) {
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
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={handleDragEnd}
          onDrag={handleDrag}
          initial={{
            scale: 1,
          }}
          whileTap={{
            scale: 1.08,
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
        <div
          className={clsxm(
            card({ rotate: idx === 0 ? 'right' : 'left' }),
            'transform-gpu',
            className
          )}
          style={{ zIndex: 999 - idx }}
        >
          {children}
        </div>
      )}
    </>
  )
}

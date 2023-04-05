'use client'

import { CloudinaryImage } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import { faces } from '@cloudinary/url-gen/qualifiers/focusOn'
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity'
import { clsxm } from '@zolplay/utils'
import { cva } from 'class-variance-authority'
import { motion, type PanInfo } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

import { env } from '~/env.mjs'

export type SwipeType = 'yes' | 'no'
export type TinderCardProps = {
  idx: number
  image: string
  active: boolean
  className?: string
  onSwiped: (idx: number, swipe: SwipeType) => void
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
const imageVariants = cva([
  'rounded-2xl shadow-xl pointer-events-none select-none',
])

const SWIPING_THRESHOLD = 200
export function TinderCard({
  idx,
  image,
  onSwiped,
  active,
  className,
}: TinderCardProps) {
  const [leaveX, setLeaveX] = React.useState(0)
  const [leaveY, setLeaveY] = React.useState(0)
  const onDragEnd = React.useCallback(
    (_e: any, info: PanInfo) => {
      if (info.offset.x > SWIPING_THRESHOLD) {
        setLeaveX(1000)
        onSwiped(idx, 'yes')
      }
      if (info.offset.x < -SWIPING_THRESHOLD) {
        setLeaveX(-1000)
        onSwiped(idx, 'no')
      }
    },
    [idx, onSwiped]
  )
  const imageUrl = React.useMemo(() => {
    return new CloudinaryImage(image, {
      cloudName: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    })
      .resize(fill().width(600).height(500).gravity(focusOn(faces())))
      .toURL()
  }, [image])

  return (
    <>
      {active ? (
        <motion.div
          drag={true}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          onDragEnd={onDragEnd}
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
            y: leaveY,
            opacity: 0,
            scale: 0.5,
            transition: { duration: 0.2 },
          }}
          className={clsxm(card(), className)}
          data-testid="active-card"
        >
          <Image
            src={imageUrl}
            alt=""
            width={600}
            height={500}
            className={imageVariants()}
            priority
            unoptimized
          />
        </motion.div>
      ) : (
        <div
          className={clsxm(
            card({ rotate: idx === 0 ? 'right' : 'left' }),
            'transform-gpu',
            className
          )}
        >
          <Image
            src={imageUrl}
            alt=""
            width={600}
            height={500}
            className={imageVariants()}
            unoptimized
          />
        </div>
      )}
    </>
  )
}

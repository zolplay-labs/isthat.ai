import { motion, type MotionProps } from 'framer-motion'
import React, { type HTMLProps, type PointerEventHandler } from 'react'

type TappableTextProps = Omit<HTMLProps<HTMLButtonElement>, 'ref' | 'type'> &
  MotionProps & {
    zoomsIn?: boolean
    onClick?: PointerEventHandler<HTMLButtonElement>
  }

export const TappableText = React.forwardRef<
  HTMLButtonElement,
  TappableTextProps
>(({ children, className, zoomsIn, ...rest }, ref) => {
  return (
    <motion.button
      ref={ref}
      className={className}
      {...rest}
      initial={{
        opacity: 0,
        scale: zoomsIn ? 0.9 : 1,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      {children}
    </motion.button>
  )
})
TappableText.displayName = 'TappableText'

type TappableSpanProps = Omit<HTMLProps<HTMLSpanElement>, 'ref'> &
  MotionProps & {
    zoomsIn?: boolean
  }

export const TappableSpan = React.forwardRef<
  HTMLSpanElement,
  TappableSpanProps
>(({ children, className, zoomsIn, ...rest }, ref) => {
  return (
    <motion.span
      ref={ref}
      className={className}
      {...rest}
      initial={{
        opacity: 0,
        scale: zoomsIn ? 0.9 : 1,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      whileHover={{
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.95,
      }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      {children}
    </motion.span>
  )
})
TappableSpan.displayName = 'TappableSpan'

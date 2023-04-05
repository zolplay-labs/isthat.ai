'use client'

import { motion } from 'framer-motion'

export function SplashScreen({ progress }: { progress?: number }) {
  return (
    <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
      <motion.div
        className="flex h-[30vh] w-[60vh] flex-col items-center rounded-2xl text-[10vh] font-bold uppercase"
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <motion.span
          initial={{ scale: 1, y: -1 }}
          animate={{
            scale: [1, 1.005],
            y: [-1, 2],
            transition: {
              delay: 0.1,
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
          className="font-sans"
        >
          is that
        </motion.span>
        <motion.span
          initial={{ y: 2, scale: 1 }}
          animate={{
            y: [2, -1],
            scale: [1, 1.01],
            transition: {
              delay: 0.22,
              duration: 1,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
          className="font-sans"
        >
          ai
        </motion.span>
      </motion.div>

      <motion.div
        className="text-primary my-[4vh] flex select-none text-[clamp(12px,3vh,20px)] font-normal uppercase"
        drag
        dragConstraints={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        {/* three moving dots */}
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.5,
              duration: 0.6,
              type: 'spring',
              stiffness: 500,
              damping: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
        >
          .
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.65,
              duration: 0.6,
              type: 'spring',
              stiffness: 500,
              damping: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
        >
          .
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              delay: 0.8,
              duration: 0.6,
              type: 'spring',
              stiffness: 500,
              damping: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            },
          }}
        >
          .
        </motion.span>
      </motion.div>
    </div>
  )
}

'use client'

import { useAuth } from '@clerk/nextjs'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { MenuScene } from '~/components/scenes/Menu.scene'
import { TrueOrFalseChallengeScene } from '~/components/scenes/TureOrFalseChallenge.scene'
import { SplashScreen } from '~/components/Splash'
import { type Scene, useGameManager } from '~/stores/GameManager.store'
import { api } from '~/utils/api'

const Scenes: Partial<Record<Scene, React.ReactNode>> = {
  LOADING: null,
  MENU: <MenuScene />,
  TRUE_OR_FALSE_CHALLENGE: <TrueOrFalseChallengeScene />,
} as const

const GameComponent: React.FC = () => {
  const { isLoaded, isSignedIn } = useAuth()
  const {
    isReady,
    scene,
    actions: { initialize },
  } = useGameManager()
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    if (!isMounted) {
      setIsMounted(true)
      void initialize()
    }
  }, [initialize, isMounted])

  const sceneElement = React.useMemo(() => {
    return (
      <motion.main
        data-scene={scene.toLowerCase()}
        key={scene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {Scenes[scene] ?? null}
      </motion.main>
    )
  }, [scene])

  if (!isLoaded || !isSignedIn || !isReady) {
    return <SplashScreen />
  }

  return (
    <div className="container relative mx-auto flex h-screen max-w-3xl flex-col">
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        <AnimatePresence mode="wait" key="scenes">
          {scene !== 'LOADING' && sceneElement}
        </AnimatePresence>
      </div>
    </div>
  )
}

export const Game = api.withTRPC(GameComponent)

'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

import { ChallengeScene } from '~/components/scenes/Challenge.scene'
import { MenuScene } from '~/components/scenes/Menu.scene'
import { useMount } from '~/hooks/useMount'
import { type Scene, useGameManager } from '~/stores/GameManager.store'

import { SplashScreen } from './Splash'

const Scenes: Partial<Record<Scene, React.ReactNode>> = {
  LOADING: <SplashScreen />,
  MENU: <MenuScene />,
  CHALLENGE: <ChallengeScene />,
} as const

export const Game: React.FC = () => {
  const {
    scene,
    actions: { initialize },
  } = useGameManager()

  useMount(() => {
    void initialize()
  })

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

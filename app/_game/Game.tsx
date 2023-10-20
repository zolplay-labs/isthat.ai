'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { type userScores } from '~/db/schema'
import { env } from '~/env.mjs'
import { useMount } from '~/hooks/useMount'
import { type Scene, useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'
import { type User } from '~/stores/User.store'

import { useUser } from './hooks/useUser'
import { Loading } from './scenes/Loading'
import { Menu } from './scenes/Menu'
import { Play } from './scenes/Play'
import { Ready } from './scenes/Ready'
import { Result } from './scenes/Result'
import { ResultWaiting } from './scenes/ResultWaiting'
import { TrialResult } from './scenes/TrialResult'
import { WarmUp } from './scenes/WarmUp'

const Scenes = {
  LOADING: <Loading />,
  MENU: <Menu />,
  WARM_UP: <WarmUp />,
  READY: <Ready />,
  PLAY: <Play />,
  RESULT_WAITING: <ResultWaiting />,
  RESULT: <Result />,
  TRIAL_RESULT: <TrialResult />,
} satisfies Record<Scene, React.ReactNode>

interface GameProps {
  user: User | null
  images: string[]
  userScoreInCurrentTest: typeof userScores.$inferSelect | null
  testId: number
  nextTestStartTime: Date
}

export function Game({
  user,
  images,
  userScoreInCurrentTest,
  testId,
  nextTestStartTime,
}: GameProps) {
  const { scene } = useScene()
  const { setUser } = useUser()
  const { setSceneProps } = useSceneProps()

  useMount(() => {
    if (!user) {
      setSceneProps('PLAY', { images, total: 1 })
      return
    }
    setUser(user)
    setSceneProps('MENU', { testId, nextTestStartTime })
    if (userScoreInCurrentTest) {
      setSceneProps('MENU', {
        hasUserScoreInCurrentTest: true,
      })
      setSceneProps('RESULT', {
        scoreId: userScoreInCurrentTest.id,
        score: userScoreInCurrentTest.score,
      })
      setSceneProps('RESULT_WAITING', { time: userScoreInCurrentTest.time })
      setSceneProps('PLAY', { total: userScoreInCurrentTest.total })
      return
    }
    setSceneProps('PLAY', {
      images,
      total: env.NEXT_PUBLIC_QUESTIONS_PER_CHALLENGE,
    })
  })

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="cursor-normal select-none font-press-start-2p"
      >
        {Scenes[scene]}
      </motion.div>
    </AnimatePresence>
  )
}

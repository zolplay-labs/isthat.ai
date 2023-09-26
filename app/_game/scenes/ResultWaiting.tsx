import { clsxm } from '@zolplay/utils'
import { AnimatePresence, motion, useTime, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import { useMount } from 'react-use'

import { checkAnswers, saveScore } from '~/app/action'
import { useMotionProgress } from '~/hooks/useMotionProgress'
import { useMotionValueState } from '~/hooks/useMotionValueState'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'
import { GRADE_IMAGES } from '../components/ResultDisplay'
import { useUser } from '../hooks/useUser'

export type Answers = { image: string; AI: boolean }[]

export function ResultWaiting() {
  const { switchScene } = useScene()
  const { sceneProps, setSceneProps } = useSceneProps()
  const props = sceneProps['RESULT_WAITING']

  const { isSignedIn } = useUser()

  const { progressState, startProgress, isProgressEnd } = useMotionProgress({
    end: 9,
    duration: 3,
  })

  useMount(async () => {
    await startProgress()
    const { score } = await checkAnswers(props.answers)
    if (isSignedIn) {
      const { challengeDays, scoreId } = await saveScore(
        score,
        props.time,
        sceneProps['PLAY'].total
      )
      setSceneProps('RESULT', { score, challengeDays, scoreId })
    } else {
      setSceneProps('TRIAL_RESULT', { isRight: score === 1 })
    }
  })

  useEffect(() => {
    if (isProgressEnd) {
      switchScene(isSignedIn ? 'RESULT' : 'TRIAL_RESULT')
    }
  }, [isProgressEnd])

  const time = useTime()
  const gradeImageIndex = useTransform(
    time,
    (current) => (Math.round(current / 1000) % 3) + 1
  )
  const currentGradeImageIndex = useMotionValueState(gradeImageIndex)

  return (
    <GameLayout
      header={<span>~ Result ~</span>}
      className="flex flex-col items-center justify-center gap-[28px]"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentGradeImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Image
            src={GRADE_IMAGES[currentGradeImageIndex] || ''}
            alt="Grade Image"
            className="h-[168px] w-[168px] sm:h-[268px] sm:w-[268px]"
            width={268}
            height={268}
          />
        </motion.div>
      </AnimatePresence>
      <div>~ Waiting ~</div>
      <div className="relative border-[2px] border-[#D9D9D9] p-[4px]">
        <div className="absolute left-[-2px] top-[-2px] h-[2px] w-[2px] bg-black" />
        <div className="absolute right-[-2px] top-[-2px] h-[2px] w-[2px] bg-black" />
        <div className="absolute bottom-[-2px] left-[-2px] h-[2px] w-[2px] bg-black" />
        <div className="absolute bottom-[-2px] right-[-2px] h-[2px] w-[2px] bg-black" />
        <div className="flex gap-[4px]">
          {new Array(10).fill(null).map((_, i) => (
            <div
              key={i}
              className={clsxm(
                'h-[12px] w-[8px]',
                progressState >= i && 'bg-white'
              )}
            />
          ))}
        </div>
      </div>
    </GameLayout>
  )
}

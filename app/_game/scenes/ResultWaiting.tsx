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
import { PIXELATED_RESULT_TIER_IMAGES } from '../components/PreloadResultWaitingImages'
import { useUser } from '../hooks/useUser'

export type Answers = { image: string; AI: boolean }[]

export function ResultWaiting() {
  const { switchScene } = useScene()
  const { sceneProps, setSceneProps } = useSceneProps()
  const props = sceneProps['RESULT_WAITING']

  const { isSignedIn } = useUser()

  const { progressState, startProgress, isProgressEnd } = useMotionProgress({
    end: 9,
    duration: 5,
  })

  useMount(async () => {
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
    await startProgress()
  })

  useEffect(() => {
    if (isProgressEnd) {
      switchScene(isSignedIn ? 'RESULT' : 'TRIAL_RESULT')
    }
  }, [isProgressEnd])

  const time = useTime()
  const loadingImageIndex = useTransform(
    time,
    (current) => Math.round(current / 800) % 9
  )
  const currentLoadingImageIndex = useMotionValueState(loadingImageIndex)

  return (
    <GameLayout
      header={<span>~ Result ~</span>}
      className="cursor-loading space-y-[32px] sm:flex sm:h-full sm:w-full sm:items-center sm:justify-center sm:gap-0"
    >
      <div className="sm:ml-2 sm:flex sm:h-full sm:w-1/2 sm:justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLoadingImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Image
              src={PIXELATED_RESULT_TIER_IMAGES[currentLoadingImageIndex] || ''}
              alt="grade"
              className="h-[248px] w-[248px] object-contain sm:h-full sm:w-full"
              width={1024}
              height={1024}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-center justify-center gap-[12px] sm:w-1/2 sm:gap-[24px]">
        <div className="text-[16px] sm:text-[32px]">~ Waiting ~</div>
        <div className="relative w-fit border-[2px] border-[#D9D9D9] p-[8px] sm:border-[4px]">
          <div className="absolute left-[-2px] top-[-2px] h-[2px] w-[2px] bg-black sm:left-[-4px] sm:top-[-4px] sm:h-[4px] sm:w-[4px]" />
          <div className="absolute right-[-2px] top-[-2px] h-[2px] w-[2px] bg-black sm:right-[-4px] sm:top-[-4px] sm:h-[4px] sm:w-[4px]" />
          <div className="absolute bottom-[-2px] left-[-2px] h-[2px] w-[2px] bg-black sm:bottom-[-4px] sm:left-[-4px] sm:h-[4px] sm:w-[4px]" />
          <div className="absolute bottom-[-2px] right-[-2px] h-[2px] w-[2px] bg-black sm:bottom-[-4px] sm:right-[-4px] sm:h-[4px] sm:w-[4px]" />
          <div className="flex gap-[4px] sm:gap-[8px]">
            {new Array(10).fill(null).map((_, i) => (
              <div
                key={i}
                className={clsxm(
                  'h-[12px] w-[8px] sm:h-[24px] sm:w-[16px]',
                  progressState >= i && 'bg-white'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </GameLayout>
  )
}

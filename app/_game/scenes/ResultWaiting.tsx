import { clsxm } from '@zolplay/utils'
import { AnimatePresence, motion, useTime, useTransform } from 'framer-motion'
import { useEffect } from 'react'

import { checkAnswers, saveScore } from '~/app/action'
import { useMotionProgress } from '~/hooks/useMotionProgress'
import { useMotionValueState } from '~/hooks/useMotionValueState'
import { useMount } from '~/hooks/useMount'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'
import { TIERS } from '../helpers/getResultTier'
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

  useMount(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const { score } = await checkAnswers(props.answers)
      if (isSignedIn) {
        const { scoreId } = await saveScore(
          score,
          props.time,
          sceneProps['PLAY'].total
        )
        setSceneProps('RESULT', { score, scoreId })
      } else {
        setSceneProps('TRIAL_RESULT', { isRight: score === 1 })
      }
      await startProgress()
    })()
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
      header={<span>~ WAITING RESULT ~</span>}
      className="cursor-loading space-y-[32px] sm:flex sm:h-full sm:w-full sm:items-center sm:justify-center sm:gap-0"
    >
      <div className="sm:ml-2 sm:flex sm:h-full sm:w-1/2 sm:justify-center">
        <AnimatePresence mode="wait">
          {/* FIXME: Images abnormally shaking on PC */}
          <motion.div
            key={currentLoadingImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              backgroundImage: `url(data:image/jpeg;base64,${
                TIERS.map(({ pixelatedImageBase64 }) => pixelatedImageBase64)[
                  currentLoadingImageIndex
                ]
              })`,
              imageRendering: 'pixelated',
            }}
            className="h-[248px] w-[248px] bg-contain bg-center bg-no-repeat sm:h-full sm:w-full"
          />
        </AnimatePresence>
      </div>
      <div className="flex flex-col items-center justify-center gap-[12px] sm:w-1/2 sm:gap-[24px]">
        <div className="text-[16px] sm:text-[32px]">~ Analyzing ~</div>
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

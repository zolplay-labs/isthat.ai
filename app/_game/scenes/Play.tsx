import { clsxm } from '@zolplay/utils'
import { AnimatePresence } from 'framer-motion'
import { produce } from 'immer'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useCountdown } from 'usehooks-ts'

import { getGameImageUrlById } from '~/helpers/getGameImageUrlById'
import { useMount } from '~/hooks/useMount'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'
import { formatTime } from '~/utils/date'

import { GameLayout } from '../components/GameLayout'
import { type SwipeSide, TinderCard } from '../components/TinderCard'
import { type Answers } from './ResultWaiting'

const SECONDS_IN_10_MINUTES = 600

export function Play() {
  const { switchScene } = useScene()
  const { sceneProps, setSceneProps } = useSceneProps()
  const props = sceneProps['PLAY']

  const [swipingSide, setSwipingSide] = useState<SwipeSide>('none')
  const [imageIndex, setImageIndex] = useState(0)

  const [startTime] = useState(new Date())
  const [answers, setAnswers] = useState<Answers>([])
  const handleAnswer = (AI: boolean) => {
    setAnswers(
      produce((draftAnswers) => {
        draftAnswers.push({ image: props.images[imageIndex] || '', AI })
      })
    )
    if (imageIndex !== props.total - 1) {
      setImageIndex(imageIndex + 1)
    }
    setSwipingSide('none')
  }
  useEffect(() => {
    if (answers.length === props.total) {
      const time = Math.floor(
        (new Date().getTime() - startTime.getTime()) / 1000
      )
      setSceneProps('RESULT_WAITING', { answers, time })
      switchScene('RESULT_WAITING')
    }
  }, [answers])

  const [remainingSeconds, { startCountdown }] = useCountdown({
    countStart: SECONDS_IN_10_MINUTES,
  })
  useMount(() => {
    startCountdown()
  })
  useEffect(() => {
    if (remainingSeconds === 0) {
      switchScene('MENU')
    }
  }, [remainingSeconds])

  return (
    <GameLayout
      header={
        <span>
          ({imageIndex + 1}/{props.total})
        </span>
      }
      className={clsxm(
        'relative flex h-full w-full items-center justify-center transition-colors',
        swipingSide === 'right' && 'bg-[#CCFBF166] sm:bg-transparent',
        swipingSide === 'left' && 'bg-[#FECDD366] sm:bg-transparent'
      )}
    >
      <div className="absolute top-[24px] flex items-center justify-center gap-[8px] sm:top-[20px]">
        <Image
          src="/images/play/clock.svg"
          alt="timer"
          className="h-[16px] w-[16px] sm:h-[24px] sm:w-[24px]"
          width={24}
          height={24}
        />
        <div className="text-[12px] sm:text-[16px]">
          {formatTime(remainingSeconds)}
        </div>
      </div>
      <div
        className={clsxm(
          'absolute z-0 hidden h-full w-1/2 sm:block',
          swipingSide === 'right' && 'right-0 bg-[#CCFBF166]',
          swipingSide === 'left' && 'left-0 bg-[#FECDD366]'
        )}
      />
      <AnimatePresence>
        {props.images.map((image, index) => (
          <TinderCard
            key={index}
            idx={index}
            active={imageIndex === index}
            onSwiped={(swipe) => handleAnswer(swipe === 'right')}
            onSwiping={(swipe) => setSwipingSide(swipe)}
            className={clsxm(index < imageIndex && 'hidden')}
          >
            <Image
              key={image}
              src={getGameImageUrlById(image)}
              alt={`question ${image}`}
              width={600}
              height={600}
              className="pointer-events-none max-h-[200px] max-w-[200px] border-[4px] border-white shadow-xl sm:max-h-[600px] sm:max-w-[600px]"
            />
          </TinderCard>
        ))}
      </AnimatePresence>
      <div className="absolute bottom-[16px] left-[16px] space-y-[18px] sm:bottom-auto sm:left-[50px]">
        <Image
          src="/images/play/arrow-left.svg"
          alt="left arrow"
          width={64}
          height={64}
        />
        <div className="text-[12px] text-[#EC4899] sm:text-[20px]">NOT AI</div>
      </div>
      <div className="absolute bottom-[16px] right-[16px] space-y-[18px] sm:bottom-auto sm:right-[50px]">
        <Image
          src="/images/play/arrow-right.svg"
          alt="right arrow"
          width={64}
          height={64}
        />
        <div className="text-right text-[12px] text-[#5EEAD4] sm:text-[20px]">
          AI
        </div>
      </div>
    </GameLayout>
  )
}

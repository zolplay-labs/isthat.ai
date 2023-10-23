import { clsxm } from '@zolplay/utils'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useCountdown, useInterval, useWindowSize } from 'usehooks-ts'

import { getGameImageUrlById } from '~/helpers/getGameImageUrlById'
import { useMount } from '~/hooks/useMount'
import dayjs from '~/lib/dayjs'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

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

  const startTime = useRef(new Date())
  const answers = useRef<Answers>([])
  const handleAnswer = (AI: boolean) => {
    if (answers.current.length === props.total) {
      return
    }
    answers.current.push({ image: props.images[imageIndex] || '', AI })
    setImageIndex(imageIndex + 1)
    setSwipingSide('none')
  }

  useInterval(() => {
    if (answers.current.length === props.total) {
      const time = Math.floor(
        (new Date().getTime() - startTime.current.getTime()) / 1000
      )
      setSceneProps('RESULT_WAITING', { answers: answers.current, time })
      switchScene('RESULT_WAITING')
    }
  }, 1000)

  const nextTestRemainingSeconds = dayjs(
    sceneProps['MENU'].nextTestStartTime
  ).diff(dayjs(), 'seconds')
  const [remainingSeconds, { startCountdown }] = useCountdown({
    countStart: Math.min(SECONDS_IN_10_MINUTES, nextTestRemainingSeconds),
  })
  useMount(() => {
    startCountdown()
  })
  useEffect(() => {
    if (remainingSeconds <= 0) {
      switchScene('MENU')
    }
  }, [remainingSeconds])

  const { width: windowWidth, height: windowHeight } = useWindowSize()
  const cardSizeConstraint = useMemo(
    () => Math.min(windowWidth, windowHeight) / 1.5,
    [windowWidth, windowHeight]
  )

  return (
    <GameLayout
      title={`(${imageIndex + 1}/${props.total})`}
      className={clsxm(
        'relative flex h-full w-full items-center justify-center transition-colors',
        swipingSide === 'right' && 'bg-[#CCFBF166] sm:bg-transparent',
        swipingSide === 'left' && 'bg-[#FECDD366] sm:bg-transparent'
      )}
    >
      <div
        className={clsxm(
          'absolute z-0 hidden h-full w-1/2 sm:block',
          swipingSide === 'right' && 'right-0 bg-[#CCFBF166]',
          swipingSide === 'left' && 'left-0 bg-[#FECDD366]'
        )}
      />
      <AnimatePresence>
        {props.images.map((image, index) =>
          index >= imageIndex ? (
            <TinderCard
              key={index}
              idx={index}
              active={imageIndex === index}
              onSwiped={(swipe) => handleAnswer(swipe === 'right')}
              onSwiping={(swipe) => setSwipingSide(swipe)}
            >
              <Image
                key={image}
                src={getGameImageUrlById(image)}
                alt={`question ${image}`}
                width={cardSizeConstraint}
                height={cardSizeConstraint}
                className="pointer-events-none select-none border-[4px] border-white shadow-xl"
                unoptimized
                priority
              />
            </TinderCard>
          ) : null
        )}
      </AnimatePresence>
      <div className="absolute top-[24px] z-[99999] flex items-center justify-center gap-[8px] mix-blend-difference sm:top-[20px]">
        <Image
          src="/images/play/clock.svg"
          alt="timer"
          className="h-[16px] w-[16px] sm:h-[24px] sm:w-[24px]"
          width={24}
          height={24}
        />
        <div className="text-[12px] sm:text-[16px]">
          {dayjs.duration(remainingSeconds, 'seconds').format('mm:ss')}
        </div>
      </div>
      <div
        className={clsxm(
          'absolute bottom-[16px] left-[16px] z-[99999] space-y-[18px] mix-blend-difference transition-transform sm:bottom-auto sm:left-[50px]',
          swipingSide === 'left' && '-translate-y-8'
        )}
      >
        <Image
          src="/images/play/arrow-left.svg"
          alt="left arrow"
          width={64}
          height={64}
        />
        <div className="text-[12px] text-[#EC4899] sm:text-[20px]">NOT AI</div>
      </div>
      <div
        className={clsxm(
          'absolute bottom-[16px] right-[16px] z-[99999] space-y-[18px] mix-blend-difference transition-transform sm:bottom-auto sm:right-[50px]',
          swipingSide === 'right' && '-translate-y-8'
        )}
      >
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

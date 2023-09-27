import { clsxm } from '@zolplay/utils'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { env } from '~/env.mjs'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'
import { type SwipeType, TinderCard } from '../components/TinderCard'
import { type Answers } from './ResultWaiting'

const startTime = new Date()
const answers: Answers = []

export function Play() {
  const { switchScene } = useScene()
  const { sceneProps, setSceneProps } = useSceneProps()
  const props = sceneProps['PLAY']

  const [imageIndex, setImageIndex] = useState(0)

  const handleAnswer = (AI: boolean) => {
    answers.push({ image: props.images[imageIndex] || '', AI })
    if (answers.length === props.total) {
      const time = Math.floor(
        (new Date().getTime() - startTime.getTime()) / 1000
      )
      setSceneProps('RESULT_WAITING', { answers, time })
      switchScene('RESULT_WAITING')
      return
    }
    setImageIndex(imageIndex + 1)
  }

  const [swipingDirection, setSwipingDirection] = useState<SwipeType>('none')

  return (
    <GameLayout
      header={
        <span>
          ({imageIndex + 1}/{props.total})
        </span>
      }
      className={clsxm(
        'relative flex h-full w-full items-center justify-center transition-colors',
        swipingDirection === 'right' && 'bg-[#CCFBF166] sm:bg-transparent',
        swipingDirection === 'left' && 'bg-[#FECDD366] sm:bg-transparent'
      )}
    >
      <div
        className={clsxm(
          'absolute z-0 hidden h-full w-1/2 sm:block',
          swipingDirection === 'right' && 'right-0 bg-[#CCFBF166]',
          swipingDirection === 'left' && 'left-0 bg-[#FECDD366]'
        )}
      />
      <AnimatePresence>
        {props.images.map((image, index) => (
          <TinderCard
            key={index}
            idx={index}
            active={imageIndex === index}
            onSwiped={(swipe) => handleAnswer(swipe === 'right')}
            onSwiping={(swipe) => setSwipingDirection(swipe)}
            className={clsxm(index < imageIndex && 'hidden')}
          >
            <Image
              key={image}
              src={`https://imagedelivery.net/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}/${image}/public`}
              alt={`Question ${image}`}
              width={600}
              height={600}
              className="pointer-events-none max-h-[200px] max-w-[200px] select-none border-[4px] border-white shadow-xl sm:max-h-[600px] sm:max-w-[600px]"
            />
          </TinderCard>
        ))}
      </AnimatePresence>
      <div className="absolute bottom-[16px] left-[16px] space-y-[18px] sm:bottom-auto sm:left-[50px]">
        <Image
          src="/images/play/arrow-left.svg"
          alt="Left arrow"
          width={64}
          height={64}
        />
        <div className="text-[12px] text-[#EC4899] sm:text-[20px]">NOT AI</div>
      </div>
      <div className="absolute bottom-[16px] right-[16px] space-y-[18px] sm:bottom-auto sm:right-[50px]">
        <Image
          src="/images/play/arrow-right.svg"
          alt="Right arrow"
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

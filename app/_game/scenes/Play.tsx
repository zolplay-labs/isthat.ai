import { clsxm } from '@zolplay/utils'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { env } from '~/env.mjs'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'
import { TinderCard } from '../components/TinderCard'
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

  return (
    <GameLayout
      header={
        <span>
          ({imageIndex + 1}/{props.total})
        </span>
      }
      className="flex h-full w-full items-center justify-center"
    >
      <AnimatePresence>
        {props.images.map((image, index) => (
          <TinderCard
            key={index}
            idx={index}
            active={imageIndex === index}
            onSwiped={(swipe) => handleAnswer(swipe === 'right')}
            className={clsxm(index < imageIndex && 'hidden')}
          >
            <Image
              key={image}
              src={`https://imagedelivery.net/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}/${image}/public`}
              alt={`Question ${image}`}
              width={400}
              height={400}
              className="pointer-events-none max-h-[400px] max-w-[200px] select-none border-[4px] border-white shadow-xl sm:max-h-[400px] sm:max-w-[400px]"
            />
          </TinderCard>
        ))}
      </AnimatePresence>
    </GameLayout>
  )
}

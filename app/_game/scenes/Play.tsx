import { clsxm } from '@zolplay/utils'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { env } from '~/env.mjs'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

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
    <div>
      <div>
        ( {imageIndex + 1} / {props.total} )
      </div>
      <div className="mt-32">
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
                width={600}
                height={500}
                className="pointer-events-none select-none rounded-2xl shadow-xl"
              />
            </TinderCard>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

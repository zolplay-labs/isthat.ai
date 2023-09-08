import { Button } from '@tremor/react'
import { clsxm } from '@zolplay/utils'
import Image from 'next/image'
import { useState } from 'react'

import { env } from '~/env.mjs'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

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
      {props.images.map((image, index) => (
        <Image
          key={image}
          src={`https://imagedelivery.net/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}/${image}/public`}
          alt={`Question ${image}`}
          width={400}
          height={400}
          className={clsxm(imageIndex !== index && 'hidden')}
        />
      ))}
      <Button onClick={() => handleAnswer(false)}>NOT AI</Button>
      <Button onClick={() => handleAnswer(true)}>AI</Button>
    </div>
  )
}

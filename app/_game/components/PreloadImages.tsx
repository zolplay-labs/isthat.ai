import Image from 'next/image'

import { getGameImageUrlById } from '~/helpers/getGameImageUrlById'
import { useSceneProps } from '~/stores/SceneProps.store'

import { PIXELATED_RESULT_TIER_IMAGES } from '../scenes/ResultWaiting'

export function PreloadImages() {
  const { sceneProps } = useSceneProps()

  return (
    <div className="hidden">
      {PIXELATED_RESULT_TIER_IMAGES.map((image, i) => (
        <Image
          src={image}
          alt={`result waiting tier ${i}`}
          width={1024}
          height={1024}
          key={i}
          priority
        />
      ))}
      {sceneProps['PLAY'].images.map((id, i) => (
        <Image
          src={getGameImageUrlById(id)}
          alt={`game ${i}`}
          width={600}
          height={600}
          key={i}
          priority
        />
      ))}
    </div>
  )
}

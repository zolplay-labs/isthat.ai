import Image from 'next/image'

import { getGameImageUrlById } from '~/helpers/getGameImageUrlById'
import { useSceneProps } from '~/stores/SceneProps.store'

export function PreloadImages() {
  const { sceneProps } = useSceneProps()

  return (
    <div className="hidden">
      {sceneProps['PLAY'].images.map(
        (id, i) =>
          id === '' && (
            <Image
              src={getGameImageUrlById(id)}
              alt={`game ${i}`}
              width={600}
              height={600}
              key={i}
              priority
            />
          )
      )}
    </div>
  )
}

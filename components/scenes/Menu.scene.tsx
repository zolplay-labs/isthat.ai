'use client'

import { TappableText } from '~/components/ui/Tappable'
import { useGameManager } from '~/stores/GameManager.store'

export function MenuScene() {
  const switchScene = useGameManager(
    ({ actions: { switchScene } }) => switchScene
  )

  return (
    <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-start p-3">
      <header className="my-4 text-4xl font-bold">isthat.ai?</header>

      <main>
        <TappableText
          className="text-lg font-bold text-green-500"
          onClick={() => switchScene('TRUE_OR_FALSE_CHALLENGE')}
        >
          Start Challenge
        </TappableText>
      </main>
    </div>
  )
}

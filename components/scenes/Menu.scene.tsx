'use client'

import { SignOutButton } from '@clerk/nextjs'

import { TappableText } from '~/components/ui/Tappable'
import { useGameManager } from '~/stores/GameManager.store'

export function MenuScene() {
  const switchScene = useGameManager(
    ({ actions: { switchScene } }) => switchScene
  )

  return (
    <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-start p-3">
      <header className="my-4 text-4xl font-bold">isthat.ai?</header>

      <main className="flex flex-col items-center space-y-3">
        <TappableText
          className="text-lg font-bold text-green-500"
          onClick={() => switchScene('CHALLENGE')}
        >
          Start Challenge
        </TappableText>

        <p className="text-red-600 dark:text-red-400">
          <SignOutButton>
            <TappableText>Sign out</TappableText>
          </SignOutButton>
        </p>
      </main>
    </div>
  )
}

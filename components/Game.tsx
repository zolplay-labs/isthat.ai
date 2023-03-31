'use client'

import { useAuth } from '@clerk/nextjs'

import { SplashScreen } from '~/components/Splash'

export function Game() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded || !isSignedIn) {
    return <SplashScreen />
  }

  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">isthat.ai</h1>
        <p className="text-xl">You are signed in!</p>
      </div>
    </main>
  )
}

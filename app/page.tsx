import { auth } from '@clerk/nextjs'
import Link from 'next/link'

import { Game } from '~/components/Game'

export default function Home() {
  const { userId } = auth()

  if (!userId) {
    return (
      <div className="container relative mx-auto flex h-screen max-w-3xl flex-col">
        <header className="my-6 w-full text-center text-2xl">
          Welcome to <strong>isthat.ai?</strong>
        </header>
        <div className="flex flex-col items-center justify-between p-4 font-bold">
          <Link href="/signin">Sign In</Link>
        </div>
      </div>
    )
  }

  return <Game />
}

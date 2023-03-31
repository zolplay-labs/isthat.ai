import { SignedIn, SignedOut } from '@clerk/nextjs/app-beta'

import { Game } from '~/components/Game'
import Link from '~/components/Link'

export default function Home() {
  return (
    <>
      <SignedIn>
        <Game />
      </SignedIn>
      <SignedOut>
        <Link href="/signin">Sign In</Link>
      </SignedOut>
    </>
  )
}

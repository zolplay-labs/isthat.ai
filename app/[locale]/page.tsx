import { SignedIn, SignedOut } from '@clerk/nextjs/app-beta'

import Link from '~/components/Link'

export default function Home() {
  return (
    <main className="bg-gray-50">
      <h1 className="text-3xl font-bold">isthat.ai</h1>
      <SignedIn>
        <p>You are signed in!</p>
      </SignedIn>
      <SignedOut>
        <p>You are signed out!</p>
        <Link href="/signin">Sign In</Link>
      </SignedOut>
    </main>
  )
}

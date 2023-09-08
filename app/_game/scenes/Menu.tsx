import { useSignIn } from '@clerk/nextjs'
import { Button } from '@tremor/react'

import { useScene } from '~/stores/Scene.store'
import { useUser } from '~/stores/User.store'

export function Menu() {
  const { isSignedIn, logout } = useUser()
  const { switchScene } = useScene()
  const { signIn } = useSignIn()

  return (
    <>
      <div>Isthat.ai</div>
      {isSignedIn ? (
        <>
          <Button onClick={() => switchScene('WARM_UP')}>
            Start challenge
          </Button>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <>
          <Button
            onClick={async () => {
              await signIn?.authenticateWithRedirect({
                strategy: 'oauth_google',
                redirectUrl: '/',
                redirectUrlComplete: '/',
              })
            }}
          >
            Sign in with Google
          </Button>
          <Button onClick={() => switchScene('WARM_UP')}>Trial Play</Button>
        </>
      )}
    </>
  )
}

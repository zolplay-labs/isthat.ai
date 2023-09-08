import { Button } from '@tremor/react'

import { useScene } from '~/stores/Scene.store'

import { useUser } from '../hooks/useUser'

export function Menu() {
  const { isSignedIn, logout, signInWithGoogle } = useUser()
  const { switchScene } = useScene()

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
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          <Button onClick={() => switchScene('WARM_UP')}>Trial Play</Button>
        </>
      )}
    </>
  )
}

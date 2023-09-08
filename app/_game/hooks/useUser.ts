import { useAuth, useSignIn } from '@clerk/nextjs'

import { useSceneProps } from '~/stores/SceneProps.store'
import { useUserStore } from '~/stores/User.store'

export const useUser = () => {
  const { logout: userStoreLogout, ...userStore } = useUserStore()
  const { setSceneProps } = useSceneProps()

  const { signOut } = useAuth()
  const { signIn } = useSignIn()

  const logout = async () => {
    await signOut()
    userStoreLogout()
    setSceneProps('PLAY', { total: 1 })
  }

  const signInWithGoogle = async () => {
    await signIn?.authenticateWithRedirect({
      strategy: 'oauth_google',
      redirectUrl: '/',
      redirectUrlComplete: '/',
    })
  }

  return { ...userStore, logout, signInWithGoogle }
}

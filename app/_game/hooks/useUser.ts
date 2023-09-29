import { useAuth, useClerk } from '@clerk/nextjs'

import { useSceneProps } from '~/stores/SceneProps.store'
import { useUserStore } from '~/stores/User.store'

export const useUser = () => {
  const { logout: userStoreLogout, ...userStore } = useUserStore()
  const { sceneProps, setSceneProps } = useSceneProps()

  const { signOut } = useAuth()
  const clerk = useClerk()

  const logout = async () => {
    await signOut()
    userStoreLogout()
    setSceneProps('PLAY', {
      total: 1,
      images: [sceneProps['PLAY'].images[0] || ''],
    })
  }

  const signInWithGoogle = async () => {
    await clerk.redirectToSignIn()
  }

  return { ...userStore, logout, signInWithGoogle }
}

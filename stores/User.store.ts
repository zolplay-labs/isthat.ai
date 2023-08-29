import { useAuth } from '@clerk/nextjs'
import { type User } from '@clerk/nextjs/dist/types/server'
import { create } from 'zustand'

type UserStore = {
  readonly user: User | null
  readonly isSignedIn: boolean
  logout(): void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isSignedIn: false,
  logout() {
    set({ user: null, isSignedIn: false })
  },
}))

export const useUser = () => {
  const { signOut } = useAuth()
  const { logout: userStoreLogout, ...userData } = useUserStore()

  const logout = async () => {
    await signOut()
    userStoreLogout()
  }

  return { userData, logout }
}

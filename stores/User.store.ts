import { useAuth } from '@clerk/nextjs'
import { type User } from '@clerk/nextjs/dist/types/server'
import { create } from 'zustand'

type UserStore = {
  readonly user: User | null
  readonly isSignedIn: boolean
  setUser(user: User | null): void
  logout(): void
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  isSignedIn: false,
  setUser(user) {
    set({ user, isSignedIn: !!user })
  },
  logout() {
    set({ user: null, isSignedIn: false })
  },
}))

export const useUser = () => {
  const { signOut } = useAuth()
  const { logout: userStoreLogout, ...userStore } = useUserStore()

  const logout = async () => {
    await signOut()
    userStoreLogout()
  }

  return { ...userStore, logout }
}

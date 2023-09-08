import { create } from 'zustand'

export type User = { name: string; avatar: string }

type UserStore = {
  readonly user: User | null
  readonly isSignedIn: boolean
  setUser(user: User | null): void
  logout(): void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isSignedIn: false,
  setUser(user) {
    set({ user, isSignedIn: !!user })
  },
  logout() {
    set({ user: null, isSignedIn: false })
  },
}))

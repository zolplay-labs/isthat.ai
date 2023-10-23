import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type User = { name: string; avatar: string }

type UserStore = {
  readonly user: User | null
  readonly isSignedIn: boolean
  setUser(user: User | null): void
  setAvatarToDefault(): void
  logout(): void
}

export const useUserStore = create(
  immer<UserStore>((set) => ({
    user: null,
    isSignedIn: false,
    setUser(user) {
      set({ user, isSignedIn: !!user })
    },
    setAvatarToDefault() {
      set((state) => {
        if (!state.user) {
          return
        }
        state.user.avatar = '/images/default-avatar.png'
      })
    },
    logout() {
      set({ user: null, isSignedIn: false })
    },
  }))
)

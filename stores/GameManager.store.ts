import { z } from 'zod'
import { create } from 'zustand'

export const Scene = z.enum(['LOADING', 'MENU', 'CHALLENGE'])
export type Scene = z.infer<typeof Scene>

type GameManagerStore = {
  readonly isReady: boolean
  readonly scene: Scene

  readonly actions: {
    initialize(): Promise<void>
    switchScene(scene: Scene): void
  }
}

export const useGameManager = create<GameManagerStore>((set, get) => {
  return {
    isReady: false,
    scene: 'LOADING',

    actions: {
      // eslint-disable-next-line @typescript-eslint/require-await
      async initialize() {
        set({ isReady: true, scene: 'MENU' })
      },
      switchScene(scene) {
        set({ scene })
      },
    },
  }
})

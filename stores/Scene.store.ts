import { create } from 'zustand'

export type Scene =
  | 'LOADING'
  | 'MENU'
  | 'WARM_UP'
  | 'READY'
  | 'PLAY'
  | 'RESULT_WAITING'
  | 'RESULT'
  | 'TRIAL_PLAY'
  | 'TRIAL_RESULT'

type SceneStore = {
  readonly scene: Scene
  switchScene(scene: Scene): void
}

export const useScene = create<SceneStore>((set) => ({
  scene: 'LOADING',
  switchScene(scene) {
    set({ scene })
  },
}))

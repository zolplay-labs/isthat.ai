import { create } from 'zustand'

export type Scene =
  | 'LOADING'
  | 'MENU'
  | 'WARM_UP'
  | 'READY'
  | 'PLAY'
  | 'RESULT_WAITING'
  | 'RESULT'
  | 'TRIAL_RESULT'

type SceneStore = {
  readonly scene: Scene
  switchScene(scene: Scene): void
}

export const useScene = create<SceneStore>((set) => ({
  scene: 'LOADING',
  switchScene(scene) {
    if (scene === 'WARM_UP' && localStorage.getItem('hasWarmedUp')) {
      // Skip warm up
      set({ scene: 'READY' })
      return
    }
    set({ scene })
  },
}))

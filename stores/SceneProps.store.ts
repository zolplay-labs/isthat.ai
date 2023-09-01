import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { type Scene } from './Scene.store'

const DEFAULT_SCENE_PROPS = {
  PLAY: {
    images: [''],
    questionsPerChallenge: 8,
  },
  TRIAL_PLAY: {
    image: '',
  },
  RESULT: {
    day: 0,
    time: 0,
    challengeDays: 0,
    score: 0,
  },
  TRIAL_RESULT: {
    isRight: false,
  },
} satisfies Partial<Record<Scene, any>>
type SceneProps = typeof DEFAULT_SCENE_PROPS
type SceneHasProps = keyof SceneProps

type ScenePropsStore = {
  readonly sceneProps: SceneProps
  setSceneProps<TScene extends SceneHasProps>(
    scene: TScene,
    props: Partial<SceneProps[TScene]>
  ): void
}

export const useSceneProps = create(
  immer<ScenePropsStore>((set) => ({
    sceneProps: DEFAULT_SCENE_PROPS,
    setSceneProps(scene, props) {
      set((state) => {
        state.sceneProps[scene] = { ...state.sceneProps[scene], props }
      })
    },
  }))
)

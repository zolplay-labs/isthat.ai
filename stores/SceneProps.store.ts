import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { type Scene } from './Scene.store'

const DEFAULT_SCENE_PROPS = {
  PLAY: {
    images: [''],
    questionsPerChallenge: 8,
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

const useScenePropsInner = create(
  immer<ScenePropsStore>((set) => ({
    sceneProps: DEFAULT_SCENE_PROPS,
    setSceneProps(scene, props) {
      set((state) => {
        state.sceneProps[scene] = { ...state.sceneProps[scene], props }
      })
    },
  }))
)

export const useSceneProps = <TScene extends SceneHasProps>(scene: TScene) => {
  const { sceneProps, setSceneProps } = useScenePropsInner()
  return {
    props: sceneProps[scene],
    setProps: (props: Partial<SceneProps[TScene]>) =>
      setSceneProps(scene, props),
  }
}

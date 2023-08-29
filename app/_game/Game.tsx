'use client'

import React from 'react'

import { type Scene, useScene } from '~/stores/Scene.store'

import { Loading } from './scenes/Loading'
import { Menu } from './scenes/Menu'
import { Play } from './scenes/Play'
import { Ready } from './scenes/Ready'
import { Result } from './scenes/Result'
import { ResultWaiting } from './scenes/ResultWaiting'
import { TrialPlay } from './scenes/TrialPlay'
import { TrialResult } from './scenes/TrialResult'
import { WarmUp } from './scenes/WarmUp'

const Scenes = {
  LOADING: <Loading />,
  MENU: <Menu />,
  WARM_UP: <WarmUp />,
  READY: <Ready />,
  PLAY: <Play />,
  RESULT_WAITING: <ResultWaiting />,
  RESULT: <Result />,
  TRIAL_PLAY: <TrialPlay />,
  TRIAL_RESULT: <TrialResult />,
} satisfies Record<Scene, React.ReactNode>

export function Game() {
  const { scene } = useScene()

  return Scenes[scene]
}

import { useMount } from 'react-use'

import { checkAnswers, saveScore } from '~/app/action'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'
import { useUser } from '../hooks/useUser'

export type Answers = { image: string; AI: boolean }[]

export function ResultWaiting() {
  const { switchScene } = useScene()
  const { sceneProps, setSceneProps } = useSceneProps()
  const props = sceneProps['RESULT_WAITING']

  const { isSignedIn } = useUser()

  useMount(async () => {
    const { score } = await checkAnswers(props.answers)
    if (isSignedIn) {
      const { challengeDays, scoreId } = await saveScore(
        score,
        props.time,
        sceneProps['PLAY'].total
      )
      setSceneProps('RESULT', { score, challengeDays, scoreId })
      switchScene('RESULT')
    } else {
      setSceneProps('TRIAL_RESULT', { isRight: score === 1 })
      switchScene('TRIAL_RESULT')
    }
  })

  return <GameLayout header={<span>~ Result ~</span>}>ResultWaiting</GameLayout>
}

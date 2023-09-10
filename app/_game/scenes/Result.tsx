import { Button } from '@tremor/react'

import { useSceneProps } from '~/stores/SceneProps.store'

import { ResultDisplay } from '../components/ResultDisplay'
import { useUser } from '../hooks/useUser'

export function Result() {
  const { user } = useUser()
  const { sceneProps } = useSceneProps()
  const { day, ...userScore } = {
    ...sceneProps['RESULT'],
    time: sceneProps['RESULT_WAITING'].time,
    total: sceneProps['PLAY'].total,
  }

  return (
    <>
      {/* TODO: Share Button */}
      <Button>Share</Button>
      <ResultDisplay
        userScore={userScore}
        user={user!}
        day={day}
        date={new Date()}
      />
    </>
  )
}

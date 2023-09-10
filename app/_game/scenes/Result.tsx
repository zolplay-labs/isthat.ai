import { Button } from '@tremor/react'

import { sqids } from '~/lib/sqids'
import { useSceneProps } from '~/stores/SceneProps.store'

import { ResultDisplay } from '../components/ResultDisplay'
import { useUser } from '../hooks/useUser'

export function Result() {
  const { user } = useUser()
  const { sceneProps } = useSceneProps()
  const { day, scoreId, ...userScore } = {
    ...sceneProps['RESULT'],
    time: sceneProps['RESULT_WAITING'].time,
    total: sceneProps['PLAY'].total,
  }

  const handleShare = () => {
    const shareId = sqids.encode([scoreId])
    // TODO: Check if browser can share
    // TODO: Change contents
    navigator.share({
      url: `/share/${shareId}`,
      title: 'Isthat.ai',
      text: 'Come and battle with AI at Isthat.ai!',
    })
  }

  return (
    <>
      <Button onClick={handleShare}>Share</Button>
      <ResultDisplay
        userScore={userScore}
        user={user!}
        day={day}
        date={new Date()}
      />
    </>
  )
}

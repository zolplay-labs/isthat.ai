import { Button } from '@tremor/react'

import { dialog } from '~/lib/dialog'
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

  const handleShare = async () => {
    const shareId = sqids.encode([scoreId])
    // TODO: Change contents
    const shareData: ShareData = {
      url: `/share/${shareId}`,
      title: 'Isthat.ai',
      text: 'Come and battle with AI at Isthat.ai!',
    }
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
      return
    }
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(`/share/${shareId}`)
      await dialog.fire({ title: 'Share link is copied!', icon: 'success' })
      return
    }
    await dialog.fire({ title: 'Unable to share', icon: 'error' })
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

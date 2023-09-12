import { Button } from '@tremor/react'
import { useState } from 'react'

import { dialog } from '~/lib/dialog'
import { sqids } from '~/lib/sqids'
import { useSceneProps } from '~/stores/SceneProps.store'

import { ResultDisplay } from '../components/ResultDisplay'
import { useUser } from '../hooks/useUser'

function CopyShareLinkDialog({
  shareLink,
  onClose,
}: {
  shareLink: string
  onClose: () => void
}) {
  const [copyButtonText, setCopyButtonText] = useState('Copy')
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink)
    setCopyButtonText('Copied!')
  }

  return (
    <div className="border-2 border-black p-2">
      <Button onClick={onClose}>Close</Button>
      <div>Share link: {shareLink}</div>
      <Button onClick={handleCopy}>{copyButtonText}</Button>
    </div>
  )
}

export function Result() {
  const { user } = useUser()
  const { sceneProps } = useSceneProps()
  const { day, scoreId, ...userScore } = {
    ...sceneProps['RESULT'],
    time: sceneProps['RESULT_WAITING'].time,
    total: sceneProps['PLAY'].total,
  }

  const [shareLinkForCopy, setShareLinkForCopy] = useState('')
  const [isCopyShareLinkDialogOpen, setIsCopyShareLinkDialogOpen] =
    useState(false)
  const handleShare = async () => {
    const shareId = sqids.encode([scoreId])
    const shareUrl = `/share/${shareId}`
    // TODO: Change contents
    const shareData: ShareData = {
      url: shareUrl,
      title: 'Isthat.ai',
      text: 'Come and battle with AI at Isthat.ai!',
    }
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
      return
    }
    if (navigator.clipboard) {
      setShareLinkForCopy(window.location.origin + shareUrl)
      setIsCopyShareLinkDialogOpen(true)
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
      {isCopyShareLinkDialogOpen && (
        <CopyShareLinkDialog
          onClose={() => setIsCopyShareLinkDialogOpen(false)}
          shareLink={shareLinkForCopy}
        />
      )}
    </>
  )
}

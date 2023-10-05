import { Button } from '@tremor/react'
import Image from 'next/image'
import { useState } from 'react'

import { sqids } from '~/lib/sqids'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'
import { ResultDisplay } from '../components/ResultDisplay'
import { useUser } from '../hooks/useUser'

// TODO: Add copy share link dialog style
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
    alert('Unable to share!')
  }

  return (
    <GameLayout
      header={<span>~ Result ~</span>}
      className="relative flex h-full w-full flex-col items-center justify-center gap-[35px] px-[10px] sm:px-[30px]"
    >
      <button
        className="absolute right-[10px] top-[10px] flex items-center gap-[4px] sm:right-[30px] sm:top-[30px] sm:gap-[8px]"
        onClick={handleShare}
      >
        <Image
          src="/images/result/share.svg"
          alt="share icon"
          className="h-[16px] w-[16px] sm:h-[24px] sm:w-[24px]"
          width={24}
          height={24}
        />
        <div className="text-[10px] sm:text-[12px]">Share</div>
      </button>
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
    </GameLayout>
  )
}

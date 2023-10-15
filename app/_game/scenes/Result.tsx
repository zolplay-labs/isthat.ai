import Image from 'next/image'
import { useRef, useState } from 'react'

import { useIsPC } from '~/hooks/useIsPC'
import { sqids } from '~/lib/sqids'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'
import { ResultDisplay } from '../components/ResultDisplay'
import { ShareDialog } from '../components/ShareDialog'
import { getResultTier } from '../helpers/getResultTier'
import { useUser } from '../hooks/useUser'

export function Result() {
  const { user } = useUser()
  const { sceneProps } = useSceneProps()
  const { scoreId, ...userScore } = {
    ...sceneProps['RESULT'],
    time: sceneProps['RESULT_WAITING'].time,
    total: sceneProps['PLAY'].total,
  }

  const isPC = useIsPC()
  const [shareLinkForDialog, setShareLinkForDialog] = useState('')
  const tier = getResultTier(userScore.score, userScore.total, userScore.time)
  const [isCopyShareLinkDialogOpen, setIsShareDialogOpen] = useState(false)
  const dialogDragConstraintsRef = useRef<HTMLDivElement>(null)

  const handleShare = async () => {
    const shareId = sqids.encode([scoreId])
    const shareUrl = `/share/${shareId}`
    // TODO: Change contents
    const shareData: ShareData = {
      url: shareUrl,
      title: 'isthat.ai',
      text: 'Come and battle with AI at isthat.ai!',
    }
    if (navigator.share && navigator.canShare(shareData)) {
      navigator.share(shareData)
      return
    }
    if (navigator.clipboard) {
      const shareLink = window.location.origin + shareUrl
      if (isPC) {
        setShareLinkForDialog(shareLink)
        setIsShareDialogOpen(true)
      } else {
        await navigator.clipboard.writeText(shareLink)
        alert('Share link is copied!')
      }
      return
    }
    alert('Unable to share!')
  }

  return (
    <GameLayout
      header={<span>~ Result ~</span>}
      className="relative h-full w-full"
      headerRight={
        <button
          className="block w-full cursor-click text-[12px] sm:flex sm:items-center sm:justify-end sm:gap-[8px]"
          onClick={handleShare}
        >
          <Image
            src="/images/result/share.svg"
            alt="share"
            width={24}
            height={24}
          />
          <span className="hidden sm:block">Share</span>
        </button>
      }
    >
      <ResultDisplay userScore={userScore} user={user!} date={new Date()} />
      <div
        className="absolute left-[4px] top-[4px] flex h-[calc(100%-8px)] w-[calc(100%-8px)] flex-col items-center justify-center"
        ref={dialogDragConstraintsRef}
      >
        {isCopyShareLinkDialogOpen && (
          <ShareDialog
            onClose={() => setIsShareDialogOpen(false)}
            shareLink={shareLinkForDialog}
            tier={tier}
            dragConstraintsRef={dialogDragConstraintsRef}
          />
        )}
      </div>
    </GameLayout>
  )
}

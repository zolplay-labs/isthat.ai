import Image from 'next/image'
import { useRef, useState } from 'react'

import { useIsPC } from '~/hooks/useIsPC'
import { sqids } from '~/lib/sqids'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'
import { ResultDisplay } from '../components/ResultDisplay'
import { ShareDialog } from '../components/ShareDialog'
import { useUser } from '../hooks/useUser'

export function Result() {
  const { user } = useUser()
  const { sceneProps } = useSceneProps()
  const { scoreId, testId, ...userScore } = {
    ...sceneProps['RESULT'],
    time: sceneProps['RESULT_WAITING'].time,
    total: sceneProps['PLAY'].total,
    testId: sceneProps['MENU'].testId,
  }

  const isPC = useIsPC()
  const [shareLinkForDialog, setShareLinkForDialog] = useState('')
  const [isCopyShareLinkDialogOpen, setIsShareDialogOpen] = useState(false)
  const dialogDragConstraintsRef = useRef<HTMLDivElement>(null)

  const handleShare = async () => {
    const shareId = sqids.encode([scoreId])
    const shareUrl = `/share/${shareId}`
    const shareData: ShareData = {
      url: shareUrl,
      title: 'isthat.ai?',
      text: 'The image Turing test for humans. Test your AI detection skills!',
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
        alert('Share link copied!')
      }
      return
    }
    alert('Share failed! Check your browser and try again.')
  }

  return (
    <GameLayout
      title="~ MY RESULT ~"
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
      <ResultDisplay userScore={userScore} user={user!} testId={testId} />
      <div
        className="absolute left-[4px] top-[4px] flex h-[calc(100%-8px)] w-[calc(100%-8px)] flex-col items-center justify-center"
        ref={dialogDragConstraintsRef}
      >
        {isCopyShareLinkDialogOpen && (
          <ShareDialog
            onClose={() => setIsShareDialogOpen(false)}
            shareLink={shareLinkForDialog}
            dragConstraintsRef={dialogDragConstraintsRef}
          />
        )}
      </div>
    </GameLayout>
  )
}

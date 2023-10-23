import Image from 'next/image'
import { usePostHog } from 'posthog-js/react'
import { useMemo, useRef, useState } from 'react'

import { useIsPC } from '~/hooks/useIsPC'
import { sqids } from '~/lib/sqids'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { BorderWithoutCorner } from '../components/BorderWithoutCorner'
import { GameLayout } from '../components/GameLayout'
import { ResultDisplay } from '../components/ResultDisplay'
import { ShareDialog } from '../components/ShareDialog'
import { useUser } from '../hooks/useUser'

function ActionButton({
  icon,
  onClick,
  children,
}: {
  icon: string
  onClick: () => void
  children: string
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex cursor-click items-center justify-center gap-[10px] p-[6px] text-[11px] sm:text-[14px]"
    >
      <BorderWithoutCorner width={4} />
      <Image
        src={`/images/result/${icon}.svg`}
        alt={icon}
        className="h-[20px] w-[20px] sm:h-[24px] sm:w-[24px]"
        width={24}
        height={24}
      />
      <div>{children}</div>
    </button>
  )
}

export function Result() {
  const postHog = usePostHog()

  const { user } = useUser()
  const { switchScene } = useScene()
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

  const shareId = useMemo(() => sqids.encode([scoreId]), [scoreId])
  const handleShare = async () => {
    postHog?.capture('click_share', { shareId })
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
    <GameLayout title="~ MY RESULT ~" className="relative h-full w-full">
      <ResultDisplay
        userScore={userScore}
        user={user!}
        testId={testId}
        actions={
          <div className="flex justify-between sm:justify-center sm:gap-[48px]">
            <ActionButton
              icon="menu"
              onClick={() => {
                postHog?.capture('click_back_to_menu', { from: 'result' })
                switchScene('MENU')
              }}
            >
              Menu
            </ActionButton>
            <ActionButton icon="share" onClick={handleShare}>
              Share
            </ActionButton>
          </div>
        }
      />
      {isCopyShareLinkDialogOpen && (
        <div
          className="absolute left-[4px] top-[4px] flex h-[calc(100%-8px)] w-[calc(100%-8px)] flex-col items-center justify-center"
          ref={dialogDragConstraintsRef}
        >
          <ShareDialog
            onClose={() => setIsShareDialogOpen(false)}
            shareLink={shareLinkForDialog}
            dragConstraintsRef={dialogDragConstraintsRef}
          />
        </div>
      )}
    </GameLayout>
  )
}

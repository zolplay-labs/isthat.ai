import { motion, useDragControls } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { useIsPC } from '~/hooks/useIsPC'
import { sqids } from '~/lib/sqids'
import { useSceneProps } from '~/stores/SceneProps.store'

import { BorderWithoutCorner } from '../components/BorderWithoutCorner'
import { GameLayout } from '../components/GameLayout'
import { ResultDisplay } from '../components/ResultDisplay'
import { getResultTier, type Tier } from '../helpers/getResultTier'
import { useUser } from '../hooks/useUser'

function ShareDialogButton({
  children,
  onClick,
}: {
  children: string
  onClick: () => void
}) {
  return (
    <button
      className="relative block cursor-click p-[10px] text-[15px]"
      onClick={onClick}
    >
      <BorderWithoutCorner width={2} />
      {children}
    </button>
  )
}

interface ShareDialogProps {
  shareLink: string
  tier: Tier
  onClose: () => void
  dragConstraintsRef: React.RefObject<HTMLDivElement>
}

function ShareDialog({
  shareLink,
  tier,
  onClose,
  dragConstraintsRef,
}: ShareDialogProps) {
  const dragControls = useDragControls()

  const [isCopied, setIsCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink)
    setIsCopied(true)
  }
  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false)
      }, 1000)
    }
  }, [isCopied])

  const downloadImageRef = useRef<HTMLAnchorElement>(null)

  return (
    <motion.div
      className="fixed"
      drag
      dragConstraints={dragConstraintsRef}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={false}
      dragListener={false}
    >
      <div className="relative bg-[#5A5A5A] p-[12px]">
        <BorderWithoutCorner width={4} />
        <div className="mb-[12px] flex justify-between selection:items-center">
          <div className="text-[16px]">Share</div>
          <div
            className="flex-1 cursor-move"
            onPointerDown={(e) => {
              dragControls.start(e)
            }}
          />
          <button className="block cursor-click pl-[12px]" onClick={onClose}>
            <Image
              src="/images/result/close.svg"
              alt="close"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-[20px] bg-black p-[20px]">
          <div className="text-[12px] text-[#a9a9a9]">
            {shareLink.replace(/^(http:\/\/|https:\/\/)/, '')}
          </div>
          <ShareDialogButton onClick={handleCopy}>
            {isCopied ? 'Copied!' : 'Copy link'}
          </ShareDialogButton>
          <a
            ref={downloadImageRef}
            href={tier.image}
            download={tier.title + '.jpg'}
            className="hidden"
          />
          <ShareDialogButton
            onClick={() => {
              downloadImageRef.current?.click()
            }}
          >
            Save image
          </ShareDialogButton>
        </div>
      </div>
    </motion.div>
  )
}

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
  const [tier, setTier] = useState<Tier>({
    image: '',
    title: '',
    description: '',
  })
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
        const tier = getResultTier(
          userScore.score,
          userScore.total,
          userScore.time
        )
        setTier(tier)
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
      {isCopyShareLinkDialogOpen && (
        <div
          className="absolute left-[4px] top-[4px] flex h-[calc(100%-8px)] w-[calc(100%-8px)] flex-col items-center justify-center"
          ref={dialogDragConstraintsRef}
        >
          <ShareDialog
            onClose={() => setIsShareDialogOpen(false)}
            shareLink={shareLinkForDialog}
            tier={tier}
            dragConstraintsRef={dialogDragConstraintsRef}
          />
        </div>
      )}
    </GameLayout>
  )
}

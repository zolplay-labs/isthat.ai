import { motion, useDragControls } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { useIsPC } from '~/hooks/useIsPC'
import { sqids } from '~/lib/sqids'
import { useSceneProps } from '~/stores/SceneProps.store'

import { GameLayout } from '../components/GameLayout'
import { ResultDisplay } from '../components/ResultDisplay'
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
      className="relative block cursor-pointer border-[2px] border-white p-[10px] text-[15px]"
      onClick={onClick}
    >
      <div className="absolute left-[-2px] top-[-2px] h-[2px] w-[2px] bg-black" />
      <div className="absolute right-[-2px] top-[-2px] h-[2px] w-[2px] bg-black" />
      <div className="absolute bottom-[-2px] left-[-2px] h-[2px] w-[2px] bg-black" />
      <div className="absolute bottom-[-2px] right-[-2px] h-[2px] w-[2px] bg-black" />
      {children}
    </button>
  )
}

interface ShareDialogProps {
  shareLink: string
  onClose: () => void
  dragConstraintsRef: React.RefObject<HTMLDivElement>
}

function ShareDialog({
  shareLink,
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
      <div className="relative border-[4px] border-white bg-[#5A5A5A] p-[12px]">
        <div className="absolute left-[-4px] top-[-4px] h-[4px] w-[4px] bg-black" />
        <div className="absolute right-[-4px] top-[-4px] h-[4px] w-[4px] bg-black" />
        <div className="absolute bottom-[-4px] left-[-4px] h-[4px] w-[4px] bg-black" />
        <div className="absolute bottom-[-4px] right-[-4px] h-[4px] w-[4px] bg-black" />
        <div className="mb-[12px] flex justify-between selection:items-center">
          <div className="text-[16px]">Share</div>
          <div
            className="flex-1 cursor-grab"
            onPointerDown={(e) => {
              dragControls.start(e)
            }}
          />
          <button className="block cursor-pointer pl-[12px]" onClick={onClose}>
            <Image
              src="/images/result/close.svg"
              alt="close"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center gap-[20px] bg-black p-[20px]">
          <div className="text-[12px] text-[#a9a9a9]">~ Share isthat.ai ~</div>
          <ShareDialogButton onClick={handleCopy}>
            {isCopied ? 'Copied!' : 'Copy link'}
          </ShareDialogButton>
          <ShareDialogButton
            // TODO: Add save image action
            onClick={() => {
              return
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
  const { day, scoreId, ...userScore } = {
    ...sceneProps['RESULT'],
    time: sceneProps['RESULT_WAITING'].time,
    total: sceneProps['PLAY'].total,
  }

  const isPC = useIsPC()
  const [shareLink, setShareLink] = useState('')
  const [isCopyShareLinkDialogOpen, setIsShareDialogOpen] = useState(false)
  const dialogDragConstraintsRef = useRef<HTMLDivElement>(null)

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
    if (navigator.clipboard && isPC) {
      setShareLink(window.location.origin + shareUrl)
      setIsShareDialogOpen(true)
      return
    }
    alert('Unable to share!')
  }

  return (
    <GameLayout
      header={<span>~ Result ~</span>}
      className="relative flex h-full w-full flex-col items-center justify-center gap-[35px] px-[10px] sm:px-[30px]"
      ref={dialogDragConstraintsRef}
    >
      <button
        className="absolute right-[10px] top-[10px] flex cursor-pointer items-center gap-[4px] sm:right-[30px] sm:top-[30px] sm:gap-[8px]"
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
        <ShareDialog
          onClose={() => setIsShareDialogOpen(false)}
          shareLink={shareLink}
          dragConstraintsRef={dialogDragConstraintsRef}
        />
      )}
    </GameLayout>
  )
}

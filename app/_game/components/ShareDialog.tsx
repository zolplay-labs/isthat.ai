import { motion, useDragControls } from 'framer-motion'
import Image from 'next/image'
import { usePostHog } from 'posthog-js/react'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'

import { BorderWithoutCorner } from './BorderWithoutCorner'

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
  onClose: () => void
  dragConstraintsRef: React.RefObject<HTMLDivElement>
}

export function ShareDialog({
  shareLink,
  onClose,
  dragConstraintsRef,
}: ShareDialogProps) {
  const dragControls = useDragControls()
  const postHog = usePostHog()

  const [isCopied, setIsCopied] = useState(false)
  const handleCopy = async () => {
    postHog?.capture('click_copy_share_link')
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

  const dialogRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(dialogRef, onClose)

  return (
    <motion.div
      className="fixed"
      drag
      dragConstraints={dragConstraintsRef}
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={false}
      dragListener={false}
      ref={dialogRef}
    >
      <div className="relative bg-[#5A5A5A] p-[12px]">
        <BorderWithoutCorner width={4} />
        <div className="mb-[12px] flex justify-between selection:items-center">
          <div className="text-[16px]">Share</div>
          <div
            className="flex-1 cursor-move active:cursor-moving"
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
            href={shareLink + '/opengraph-image'}
            // TODO: Change image file name
            download="isthat.ai_share_image.png"
            className="hidden"
          />
          <ShareDialogButton
            onClick={() => {
              postHog?.capture('click_download_share_image')
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

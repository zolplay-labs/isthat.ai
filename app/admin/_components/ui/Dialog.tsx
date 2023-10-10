'use client'

import { Dialog as HLDialog } from '@headlessui/react'
import { Card, Title } from '@tremor/react'
import { clsxm } from '@zolplay/utils'
import { AnimatePresence, motion } from 'framer-motion'

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children?: React.ReactNode
  className?: string
}

export function Dialog({
  isOpen,
  onClose,
  title,
  children,
  className,
}: DialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <HLDialog
          as={motion.div}
          className="relative"
          open={isOpen}
          onClose={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center text-center">
              <HLDialog.Panel
                as={Card}
                className="w-full max-w-md overflow-visible p-6"
              >
                <HLDialog.Title as={Title}>{title}</HLDialog.Title>
                <div className={clsxm('mt-4', className)}>{children}</div>
              </HLDialog.Panel>
            </div>
          </div>
        </HLDialog>
      )}
    </AnimatePresence>
  )
}

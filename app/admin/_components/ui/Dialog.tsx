'use client'

import { Dialog as HLDialog, Transition } from '@headlessui/react'
import { Card, Title } from '@tremor/react'
import { clsxm } from '@zolplay/utils'
import { Fragment } from 'react'

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
    <Transition appear show={isOpen} as={Fragment}>
      <HLDialog as="div" className="relative" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HLDialog.Panel
                as={Card}
                className="w-full max-w-md transform overflow-visible p-6 transition-all"
              >
                <HLDialog.Title as={Title}>{title}</HLDialog.Title>
                <div className={clsxm('mt-4', className)}>{children}</div>
              </HLDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HLDialog>
    </Transition>
  )
}

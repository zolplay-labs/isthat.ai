'use client'

import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'

import { BorderWithoutCorner } from '~/app/_game/components/BorderWithoutCorner'

export function Actions({
  viewingUserFinishedCurrentTest,
}: {
  viewingUserFinishedCurrentTest: boolean
}) {
  const postHog = usePostHog()

  return (
    <Link
      href="/"
      className="relative block cursor-click py-[6px] text-center text-[12px] sm:p-[16px] sm:text-[16px]"
      onClick={() => {
        viewingUserFinishedCurrentTest
          ? postHog?.capture('click_back_to_menu', { from: 'share' })
          : postHog?.capture('click_let_me_try')
      }}
    >
      <BorderWithoutCorner width={4} />
      {viewingUserFinishedCurrentTest ? 'Back to Menu' : 'Let Me Try'}
    </Link>
  )
}

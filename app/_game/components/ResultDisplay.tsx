'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePostHog } from 'posthog-js/react'
import { useState } from 'react'

import { type userScores } from '~/db/schema'
import { type User } from '~/stores/User.store'

import { getResultTier } from '../helpers/getResultTier'
import { BorderWithoutCorner } from './BorderWithoutCorner'

interface ResultDisplayProps {
  userScore: Omit<typeof userScores.$inferSelect, 'id' | 'userId' | 'createdAt'>
  user: User
  testId: number
  hasBattleButton?: boolean
}
export function ResultDisplay({
  userScore,
  user,
  testId,
  hasBattleButton,
}: ResultDisplayProps) {
  const postHog = usePostHog()
  const tier = getResultTier(userScore.score, userScore.total, userScore.time)

  const [avatar, setAvatar] = useState(user.avatar!)

  return (
    <div className="h-full w-full sm:flex sm:items-center sm:justify-center sm:gap-0">
      <div className="hidden sm:ml-2 sm:flex sm:h-full sm:w-1/2">
        <Image
          placeholder={`data:image/jpeg;base64,${tier.pixelatedImageBase64}`}
          src={tier.image}
          alt="tier"
          className="h-full w-full"
          // To enable `object-contain` for placeholder, it must be in `style`
          style={{ imageRendering: 'pixelated', objectFit: 'contain' }}
          width={1024}
          height={1024}
        />
      </div>
      <div className="flex h-full flex-col items-center justify-between px-[10px] py-[20px] sm:w-1/2 sm:justify-center sm:gap-[48px] sm:p-[24px]">
        <div className="text-center">
          <div className="text-[16px] sm:text-[20px]">~ Test #{testId} ~</div>
          <div className="text-[13px] sm:text-[16px] sm:text-[#A9A9A9]">
            isthat.ai
          </div>
        </div>
        <Image
          src={tier.image}
          alt="grade"
          className="block sm:hidden"
          style={{ imageRendering: 'pixelated' }}
          placeholder={`data:image/jpeg;base64,${tier.pixelatedImageBase64}`}
          width={248}
          height={248}
        />
        <div className="space-y-[10px] text-center sm:space-y-[14px]">
          <div className="flex items-center justify-center gap-[8px] sm:gap-[16px]">
            <div className="relative w-fit">
              <BorderWithoutCorner width={2} />
              <Image
                src={avatar}
                width={20}
                height={20}
                alt="avatar"
                onError={() => setAvatar('/images/default-avatar.png')}
                priority
                className="h-[16px] w-[16px] sm:h-[20px] sm:w-[20px]"
              />
            </div>
            <div className="text-[12px] sm:text-[16px]">{user.name}</div>
          </div>
          <div className="text-[23px] sm:text-[32px]">{tier.title}</div>
          <div className="text-[8px] text-[#A9A9A9] sm:text-[13px]">
            {tier.description}
          </div>
        </div>
        {hasBattleButton ? (
          <Link
            href="/"
            className="relative block w-[248px] cursor-click py-[6px] text-center text-[12px] sm:w-fit sm:p-[16px] sm:text-[16px]"
            onClick={() => {
              postHog?.capture('click_battle_with_ai')
            }}
          >
            <BorderWithoutCorner width={4} />
            Battle with AI
          </Link>
        ) : (
          <div className="flex w-full justify-between sm:justify-around"></div>
        )}
      </div>
    </div>
  )
}

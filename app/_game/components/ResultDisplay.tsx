'use client'

import Image from 'next/image'
import { useState } from 'react'

import { type userScores } from '~/db/schema'
import dayjs from '~/lib/dayjs'
import { type User } from '~/stores/User.store'

import { getResultTier } from '../helpers/getResultTier'
import { BorderWithoutCorner } from './BorderWithoutCorner'

interface ResultDisplayProps {
  userScore: Omit<typeof userScores.$inferSelect, 'id' | 'userId' | 'createdAt'>
  user: User
  testId: number
  actions?: React.ReactNode
}
export function ResultDisplay({
  userScore,
  user,
  testId,
  actions,
}: ResultDisplayProps) {
  const tier = getResultTier({
    score: userScore.score,
    total: userScore.total,
    time: userScore.time,
  })

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
        <div className="flex items-center justify-center gap-[10px] text-[13px] sm:gap-[16px] sm:text-[16px]">
          <Image
            src="/images/play/clock.svg"
            height={24}
            width={24}
            alt="time"
            className="h-[18px] w-[18px] sm:h-[24px] sm:w-[24px]"
            priority
          />
          <div>{dayjs.duration(userScore.time, 'seconds').format('mm:ss')}</div>
          <Image
            src="/images/result/trophy.svg"
            height={24}
            width={24}
            alt="score"
            className="h-[18px] w-[18px] sm:h-[24px] sm:w-[24px]"
            priority
          />
          <div>
            {userScore.score}/{userScore.total}
          </div>
        </div>
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
          <a
            className="block cursor-click text-[23px] sm:text-[32px]"
            href="https://x.com/isthatai/status/1716372473103712335"
            target="_blank"
          >
            <span>{tier.title}</span>
            <Image
              src="/images/result/info.svg"
              height={18}
              width={18}
              alt="tier info"
              className="ml-[4px] inline h-[14px] w-[14px] sm:h-[18px] sm:w-[18px]"
              priority
            />
          </a>
          <div className="text-[8px] text-[#A9A9A9] sm:text-[13px]">
            {tier.description}
          </div>
        </div>
        <div className="w-[248px] sm:w-fit">{actions}</div>
      </div>
    </div>
  )
}

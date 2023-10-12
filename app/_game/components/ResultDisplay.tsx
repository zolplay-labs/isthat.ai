'use client'

import Image from 'next/image'
import { useState } from 'react'

import { type userScores } from '~/db/schema'
import { type User } from '~/stores/User.store'
import { formatDate, formatTime } from '~/utils/date'

import { getResultTier } from '../helpers/getResultTier'
import { BorderWithoutCorner } from './BorderWithoutCorner'

interface InfoItemProps {
  name: string
  value: string
}
function InfoItem({ name, value }: InfoItemProps) {
  return (
    <div className="space-y-[4px] sm:space-y-[8px]">
      <div className="text-[8px] sm:text-[12px] sm:text-[#a9a9a9]">{name}</div>
      <div className="text-[12px] sm:text-[16px]">{value}</div>
    </div>
  )
}

interface ResultDisplayProps {
  userScore: Omit<typeof userScores.$inferSelect, 'id' | 'userId' | 'createdAt'>
  user: User
  date: Date
}
export function ResultDisplay({ userScore, user, date }: ResultDisplayProps) {
  const tier = getResultTier(userScore.score, userScore.total, userScore.time)
  const info: InfoItemProps[] = [
    { name: 'Time', value: formatTime(userScore.time) },
    { name: 'Challenge Days', value: String(userScore.challengeDays) },
  ]

  const [avatar, setAvatar] = useState(user.avatar!)

  return (
    <div className="h-full w-full sm:flex sm:items-center sm:justify-center sm:gap-0">
      <div className="hidden sm:ml-2 sm:block sm:w-1/2">
        <Image
          src={tier.image}
          alt="grade"
          className="h-full w-full"
          width={1024}
          height={1024}
        />
      </div>
      <div className="flex h-full flex-col items-center justify-between px-[10px] py-[20px] sm:w-1/2 sm:p-[24px]">
        <div className="text-center">
          <div className="text-[16px] sm:text-[20px]">
            ~ {formatDate(date)} ~
          </div>
          <div className="text-[13px] sm:text-[16px] sm:text-[#A9A9A9]">
            @isthat.ai
          </div>
        </div>
        <Image
          src={tier.image}
          alt="grade"
          className="block sm:hidden"
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
        <div className="flex w-full justify-between sm:justify-around">
          {info.map((infoItem, i) => (
            <InfoItem key={i} {...infoItem} />
          ))}
        </div>
      </div>
    </div>
  )
}

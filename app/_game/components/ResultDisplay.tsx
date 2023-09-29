import { clsxm } from '@zolplay/utils'
import Image from 'next/image'

import { type userScores } from '~/db/schema'
import { type User } from '~/stores/User.store'
import { formatDate, formatTime } from '~/utils/date'

const calculateGrade = (score: number, total: number) => {
  if (score === total) return 0
  if (score > Math.floor(total / 2)) return 1
  if (score > Math.floor(total / 4)) return 2
  return 3
}

export const GRADE_IMAGES = [
  '/images/result/thumb.svg',
  '/images/result/smile.svg',
  '/images/result/think.svg',
  '/images/result/sad.svg',
]
const GRADE_DESCRIPTIONS = [
  'Excellent Job',
  'Congratulations',
  'Good Job',
  "Don't lose heart. Try again tomorrow!",
]

interface ResultDisplayProps {
  userScore: Omit<typeof userScores.$inferSelect, 'id' | 'userId' | 'createdAt'>
  user: User
  day: number
  date: Date
}

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

export function ResultDisplay({
  userScore,
  user,
  day,
  date,
}: ResultDisplayProps) {
  const grade = calculateGrade(userScore.score, userScore.total)
  const info: InfoItemProps[] = [
    { name: 'Isthat.ai', value: `Day ${day}` },
    { name: 'Time', value: formatTime(userScore.time) },
    { name: 'Challenge Days', value: String(userScore.challengeDays) },
    { name: 'Date', value: formatDate(date) },
  ]

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-[12px] text-center sm:gap-[28px]">
        <Image
          src={GRADE_IMAGES[grade] || ''}
          alt="Grade Image"
          className="h-[168px] w-[168px] sm:h-[268px] sm:w-[268px]"
          width={268}
          height={268}
        />
        <div className="text-[10px] sm:text-[13px]">
          ~ {GRADE_DESCRIPTIONS[grade]} ~
        </div>
        <div className="flex items-center justify-center gap-[16px]">
          <div className="relative w-fit border-[2px] border-white">
            <div className="absolute left-[-2px] top-[-2px] h-[2px] w-[2px] bg-black" />
            <div className="absolute right-[-2px] top-[-2px] h-[2px] w-[2px] bg-black" />
            <div className="absolute bottom-[-2px] left-[-2px] h-[2px] w-[2px] bg-black" />
            <div className="absolute bottom-[-2px] right-[-2px] h-[2px] w-[2px] bg-black" />
            <Image
              src={user.avatar || ''}
              width={28}
              height={28}
              alt="User Avatar"
            />
          </div>
          <div className="text-[16px] sm:text-[24px]">{user.name}</div>
        </div>
        <div className="flex items-center justify-center gap-[36px]">
          <Image
            src="/images/result/trophy.svg"
            alt="trophy"
            className="h-[44px] w-[44px] sm:h-[64px] sm:w-[64px]"
            width={64}
            height={64}
          />
          <div className="text-[16px] sm:text-[24px]">X</div>
          <div
            className={clsxm(
              'text-[32px] sm:text-[54px]',
              grade === 0 && 'text-[#ee418c]'
            )}
          >
            {userScore.score}
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-2 gap-[10px] sm:flex sm:justify-between sm:gap-0">
        {info.map((infoItem, i) => (
          <InfoItem key={i} {...infoItem} />
        ))}
      </div>
    </>
  )
}

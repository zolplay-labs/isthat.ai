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

const GRADE_EMOJIS = ['👍', '😀', '😐', '🙁']
const GRADE_DESCRIPTIONS = [
  'Excellent Job',
  'Congratulations',
  'Good Job',
  'Not satisfied with the results? Restart',
]

interface ResultDisplayProps {
  userScore: Omit<typeof userScores.$inferSelect, 'id' | 'userId' | 'createdAt'>
  user: User
  day: number
  date: Date
}

export function ResultDisplay({
  userScore,
  user,
  day,
  date,
}: ResultDisplayProps) {
  const grade = calculateGrade(userScore.score, userScore.total)

  return (
    <div className="space-y-6">
      <div>
        <div>{GRADE_EMOJIS[grade]}</div>
        <div>{GRADE_DESCRIPTIONS[grade]}</div>
      </div>

      <div>
        <div>{user.name}</div>
        <Image
          src={user.avatar || ''}
          width={20}
          height={20}
          alt="User Avatar"
        />
      </div>

      <div>🏆 x {userScore.score}</div>

      <div className="flex justify-between">
        <div>
          <div>Isthat.ai</div>
          <div>Day {day}</div>
        </div>
        <div>
          <div>Time</div>
          <div>{formatTime(userScore.time)}</div>
        </div>
        <div>
          <div>Challenge Days</div>
          <div>{userScore.challengeDays}</div>
        </div>
        <div>
          <div>Date</div>
          <div>{formatDate(date)}</div>
        </div>
      </div>
    </div>
  )
}

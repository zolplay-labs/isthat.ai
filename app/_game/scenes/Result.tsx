import Image from 'next/image'

import { useSceneProps } from '~/stores/SceneProps.store'
import { formatDate, formatTime } from '~/utils/date'

import { useUser } from '../hooks/useUser'

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

export function Result() {
  const { user } = useUser()
  const { sceneProps } = useSceneProps()
  const props = {
    ...sceneProps['RESULT'],
    time: sceneProps['RESULT_WAITING'].time,
    total: sceneProps['PLAY'].total,
  }

  const grade = calculateGrade(props.score, props.total)

  return (
    <div className="space-y-6">
      <div>
        <div>{GRADE_EMOJIS[grade]}</div>
        <div>{GRADE_DESCRIPTIONS[grade]}</div>
      </div>

      <div>
        <div>{user?.name}</div>
        <Image
          src={user?.avatar || ''}
          width={20}
          height={20}
          alt="User Avatar"
        />
      </div>

      <div>🏆 x {props.score}</div>

      <div className="flex justify-between">
        <div>
          <div>Isthat.ai</div>
          <div>Day {props.day}</div>
        </div>
        <div>
          <div>Time</div>
          <div>{formatTime(props.time)}</div>
        </div>
        <div>
          <div>Challenge Days</div>
          <div>{props.challengeDays}</div>
        </div>
        <div>
          <div>Date</div>
          <div>{formatDate(new Date())}</div>
        </div>
      </div>
    </div>
  )
}

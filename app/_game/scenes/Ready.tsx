import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

import { useMount } from '~/hooks/useMount'
import { useScene } from '~/stores/Scene.store'

import { GameLayout } from '../components/GameLayout'

function Header() {
  return (
    <span>
      <span>Ready to show </span>
      <span className="bg-[linear-gradient(180deg,#E3FFB5_0%,#9E95FF_60.09%,#0E7FA3_100%,#712E91_100%,#D57DFF_100%)] bg-clip-text text-transparent">
        AI
      </span>
      <span> who&apos;s the boss?</span>
    </span>
  )
}

export function Ready() {
  const { switchScene } = useScene()

  const [countdown, { startCountdown }] = useCountdown({
    countStart: 3,
    countStop: 0,
  })
  useMount(() => {
    startCountdown()
  })
  useEffect(() => {
    if (countdown === 0) {
      setTimeout(() => {
        switchScene('PLAY')
      }, 500)
    }
  }, [countdown])

  return (
    <GameLayout header={<Header />} className="text-[120px] sm:text-[240px]">
      {countdown === 0 ? 'GO' : countdown}
    </GameLayout>
  )
}

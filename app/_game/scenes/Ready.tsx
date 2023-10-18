import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

import { useMount } from '~/hooks/useMount'
import { useScene } from '~/stores/Scene.store'

import { GameLayout } from '../components/GameLayout'

function Header() {
  return <span>Ready to show A.I. who&apos;s boss?</span>
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

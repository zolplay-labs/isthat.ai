import { useEffect, useState } from 'react'

import { useScene } from '~/stores/Scene.store'

import { GameLayout } from '../components/GameLayout'

export function Ready() {
  const { switchScene } = useScene()

  const [countdown, setCountdown] = useState<number | string>(3)

  useEffect(() => {
    let currentCountdown = 3
    const countdownInterval = setInterval(() => {
      currentCountdown--
      if (currentCountdown === 0) {
        setCountdown('GO')
        setTimeout(() => {
          switchScene('PLAY')
        }, 500)
        clearInterval(countdownInterval)
        return
      }
      setCountdown(currentCountdown)
    }, 1000)

    return () => clearInterval(countdownInterval)
  }, [])

  return (
    <GameLayout
      header={<span>Ready for today&apos;s challenge?</span>}
      className="text-[120px] sm:text-[240px]"
    >
      {countdown}
    </GameLayout>
  )
}

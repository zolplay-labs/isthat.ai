import Image from 'next/image'

import { useSceneProps } from '~/stores/SceneProps.store'

import { BorderWithoutCorner } from '../components/BorderWithoutCorner'
import { GameLayout } from '../components/GameLayout'
import { useUser } from '../hooks/useUser'

type TrialTier = {
  image: string
  title: string
  description: string
  button: string
}
const TRAIL_TIER: Map<boolean, TrialTier> = new Map([
  [
    true,
    {
      image: '/images/result-tiers/techie-trainee.jpg',
      title: 'Nice!',
      description: 'Think you can tell apart nature from neural net?',
      button: "I'm ready",
    },
  ],
  [
    false,
    {
      image: '/images/result-tiers/blundering-botanist.jpg',
      title: 'Ooops...',
      description: 'AI tricked ya real good here.',
      button: 'I can do this!',
    },
  ],
])

export function TrialResult() {
  const { sceneProps } = useSceneProps()
  const props = sceneProps['TRIAL_RESULT']

  const { signInWithGoogle } = useUser()

  return (
    <GameLayout
      header={<span>~ Result ~</span>}
      className="relative flex h-full w-full flex-col items-center justify-center sm:flex-row"
    >
      <div className="sm:ml-2 sm:w-1/2">
        <Image
          src={TRAIL_TIER.get(props.isRight)?.image || ''}
          alt="tier"
          className="h-[248px] w-[248px] sm:h-full sm:w-full"
          width={1024}
          height={1024}
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center sm:w-1/2">
        <div className="mb-[8px] mt-[16px] text-[16px] sm:my-0 sm:text-[28px]">
          <div>{TRAIL_TIER.get(props.isRight)?.title}</div>
        </div>
        <div className="text-[8px] text-[#A9A9A9] sm:mb-[36px] sm:mt-[12px] sm:text-[13px]">
          {TRAIL_TIER.get(props.isRight)?.description}
        </div>
        <button
          onClick={signInWithGoogle}
          className="absolute bottom-[20px] block w-[248px] cursor-click py-[6px] text-center text-[12px] sm:relative sm:bottom-auto sm:w-fit sm:p-[6px] sm:text-[16px]"
        >
          <BorderWithoutCorner width={4} />
          {TRAIL_TIER.get(props.isRight)?.button}
        </button>
      </div>
    </GameLayout>
  )
}

import Image from 'next/image'

import { useSceneProps } from '~/stores/SceneProps.store'

import { BorderWithoutCorner } from '../components/BorderWithoutCorner'
import { GameLayout } from '../components/GameLayout'
import { type Tier, TIERS } from '../helpers/getResultTier'
import { useUser } from '../hooks/useUser'

const techieTraineeTier = TIERS.find(({ title }) => title === 'Techie Trainee')!
const blunderingBotanistTier = TIERS.find(
  ({ title }) => title === 'Blundering Botanist'
)!

type TrialTier = Tier & { button: string }
const TRAIL_TIER: Map<boolean, TrialTier> = new Map([
  [
    true,
    {
      image: techieTraineeTier.image,
      title: 'Nice!',
      description: 'Think you can tell apart nature from neural net?',
      button: "I'm ready",
      pixelatedImageBase64: techieTraineeTier.pixelatedImageBase64,
    },
  ],
  [
    false,
    {
      image: blunderingBotanistTier.image,
      title: 'Ooops...',
      description: 'AI tricked ya real good here.',
      button: 'I can do this!',
      pixelatedImageBase64: blunderingBotanistTier.pixelatedImageBase64,
    },
  ],
])

export function TrialResult() {
  const { sceneProps } = useSceneProps()
  const props = sceneProps['TRIAL_RESULT']

  const { signInWithGoogle } = useUser()

  const tier = TRAIL_TIER.get(props.isRight)!

  return (
    <GameLayout
      title="~ MY RESULT ~"
      className="relative flex h-full w-full flex-col items-center justify-center sm:flex-row"
    >
      <div className="sm:ml-2 sm:h-full sm:w-1/2">
        <Image
          placeholder={`data:image/jpeg;base64,${tier.pixelatedImageBase64}`}
          src={tier.image}
          alt="tier"
          className="h-[248px] w-[248px] sm:h-full sm:w-full"
          style={{ imageRendering: 'pixelated', objectFit: 'contain' }}
          width={1024}
          height={1024}
        />
      </div>
      <div className="flex flex-col items-center justify-center text-center sm:w-1/2">
        <div className="mb-[8px] mt-[16px] text-[16px] sm:my-0 sm:text-[28px]">
          <div>{tier.title}</div>
        </div>
        <div className="text-[8px] text-[#A9A9A9] sm:mb-[36px] sm:mt-[12px] sm:text-[13px]">
          {tier.description}
        </div>
        <button
          onClick={signInWithGoogle}
          className="absolute bottom-[20px] block w-[248px] cursor-click py-[6px] text-center text-[12px] sm:relative sm:bottom-auto sm:w-fit sm:p-[6px] sm:text-[16px]"
        >
          <BorderWithoutCorner width={4} />
          {tier.button}
        </button>
      </div>
    </GameLayout>
  )
}

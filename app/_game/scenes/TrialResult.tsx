import Image from 'next/image'

import { useSceneProps } from '~/stores/SceneProps.store'

import { BorderWithoutCorner } from '../components/BorderWithoutCorner'
import { GameLayout } from '../components/GameLayout'
import { useUser } from '../hooks/useUser'

export function TrialResult() {
  const { sceneProps } = useSceneProps()
  const props = sceneProps['TRIAL_RESULT']

  const { signInWithGoogle } = useUser()

  return (
    <GameLayout
      header={<span>~ Result ~</span>}
      className="flex flex-col items-center justify-center text-center"
    >
      <Image
        src={
          props.isRight ? '/images/result/smile.svg' : '/images/result/sad.svg'
        }
        alt="grade"
        className="h-[168px] w-[168px] sm:h-[268px] sm:w-[268px]"
        width={268}
        height={268}
      />
      <div className="mt-[12px] text-[10px] sm:mt-[8px] sm:text-[16px]">
        <div className="hidden sm:block">
          {props.isRight
            ? '~ Congratulations! You got it right. ~'
            : "~ I'm sorry. You got it wrong. ~"}
        </div>
        <div className="sm:hidden">
          {props.isRight ? (
            <>
              <div>Congratulations!</div>
              <div>You got it right.</div>
            </>
          ) : (
            <>
              <div>I&apos;m sorry.</div>
              <div>You got it wrong.</div>
            </>
          )}
        </div>
      </div>
      <div className="mb-[24px] mt-[44px] text-[8px] sm:mt-[58px] sm:text-[13px]">
        {props.isRight
          ? "Continuing the challenge won't be that easy..."
          : "Do you want to tell me that you're not just capable of this much?"}
      </div>
      <button
        onClick={signInWithGoogle}
        className="relative block cursor-pointer py-[6px] text-[9px] leading-[24px] sm:p-[6px] sm:text-[14px]"
      >
        <BorderWithoutCorner width={4} />
        Sign up and Battle with AI
      </button>
    </GameLayout>
  )
}

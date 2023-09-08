import { Button } from '@tremor/react'

import { useSceneProps } from '~/stores/SceneProps.store'

export function TrialResult() {
  const { sceneProps } = useSceneProps()
  const props = sceneProps['TRIAL_RESULT']

  return (
    <div>
      <div>{props.isRight ? '😀' : '🙁'}</div>
      <div>
        {props.isRight
          ? '~ Congratulations, you got it right! ~'
          : "~ I'm sorry, you got it wrong. ~"}
      </div>
      <div>
        {props.isRight
          ? "Continuing the challenge won't be that easy..."
          : "Do you want to tell me that you're not just capable of this much?"}
      </div>
      <Button>Sign up and Battle with AI</Button>
    </div>
  )
}

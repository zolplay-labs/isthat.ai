import { clsxm } from '@zolplay/utils'
import Image from 'next/image'
import { usePostHog } from 'posthog-js/react'
import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

import { checkUserHasScoreInCurrentTest } from '~/app/action'
import { useMount } from '~/hooks/useMount'
import dayjs from '~/lib/dayjs'
import { useScene } from '~/stores/Scene.store'
import { useSceneProps } from '~/stores/SceneProps.store'

import { BorderWithoutCorner } from '../components/BorderWithoutCorner'
import { MenuButton } from '../components/MenuButton'
import { PreloadImages } from '../components/PreloadImages'
import { useUser } from '../hooks/useUser'

const formatTime = (seconds: number) => {
  const SECONDS_IN_1_HOUR = 3600
  const duration = dayjs.duration(seconds, 'seconds')
  if (seconds >= SECONDS_IN_1_HOUR) {
    return duration.format('HH:mm:ss')
  } else {
    return duration.format('mm:ss')
  }
}

export function Menu() {
  const { isSignedIn, logout, signInWithGoogle, user, setAvatarToDefault } =
    useUser()
  const { switchScene } = useScene()
  const { sceneProps } = useSceneProps()
  const props = sceneProps['MENU']

  const postHog = usePostHog()
  const [nextTestRemainingSeconds, { startCountdown }] = useCountdown({
    countStart: dayjs(props.nextTestStartTime).diff(dayjs(), 'seconds'),
  })
  useMount(() => {
    startCountdown()
  })
  useEffect(() => {
    if (nextTestRemainingSeconds <= 0) {
      postHog?.capture('idle_timeout')
      location.reload()
    }
  }, [nextTestRemainingSeconds])

  return (
    <div className="relative flex h-[100dvh] items-center justify-center bg-[url('/images/menu/screen.svg')] bg-cover bg-center bg-no-repeat">
      <PreloadImages />
      <div className="absolute top-[16%] flex w-[80%] items-center justify-between sm:w-[60%]">
        <a
          className="flex cursor-click items-baseline gap-[8px] sm:gap-[12px]"
          href="https://x.com/isthatai"
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            postHog?.capture('click_follow_on_x')
          }}
        >
          <div className="text-[12px] sm:text-[14px]">Follow on</div>
          <div className="text-[20px] sm:text-[30px]">𝕏</div>
        </a>
        {isSignedIn && user?.avatar && (
          <div
            className="relative"
            onClick={() => postHog?.capture('click_profile_image')}
          >
            <BorderWithoutCorner width={3} />
            <Image
              src={user.avatar}
              alt="avatar"
              height={42}
              width={42}
              onError={setAvatarToDefault}
              priority
            />
          </div>
        )}
      </div>
      <div>
        <div
          className={clsxm(
            'flex flex-col items-center justify-center text-center sm:text-[24px]',
            props.hasUserScoreInCurrentTest
              ? 'mb-[33px] sm:mb-[48px]'
              : 'mb-[50px] sm:mb-[100px]'
          )}
        >
          <Image
            src="/images/logo.svg"
            alt="logo"
            className="h-[168px] w-[168px] sm:h-[200px] sm:w-[200px]"
            width={200}
            height={200}
            priority
          />
          <div className="text-[14px] sm:text-[24px]">isthat.ai</div>
          {props.hasUserScoreInCurrentTest && (
            <div className="mt-[12px] text-[#929292] sm:mt-[24px]">
              <div className="text-[16px] sm:text-[24px]">
                Take Test #{props.testId + 1}
              </div>
              <div className="text-[10px] sm:text-[16px]">
                in {formatTime(nextTestRemainingSeconds)}
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center gap-[24px] sm:gap-[44px]">
          {isSignedIn ? (
            <>
              {props.hasUserScoreInCurrentTest ? (
                <MenuButton
                  onClick={() => {
                    postHog?.capture('click_view_result', {
                      test_id: props.testId,
                    })
                    switchScene('RESULT')
                  }}
                >
                  {`View #${props.testId} Result`}
                </MenuButton>
              ) : (
                <MenuButton
                  onClick={async () => {
                    postHog?.capture('click_take_test', {
                      test_id: props.testId,
                    })
                    const hasScoreInCurrentTest =
                      await checkUserHasScoreInCurrentTest({
                        testId: props.testId,
                      })
                    if (hasScoreInCurrentTest) {
                      location.reload()
                      return
                    }
                    switchScene('WARM_UP')
                  }}
                >
                  {`Take Test #${props.testId}`}
                </MenuButton>
              )}
              <MenuButton
                onClick={() => {
                  postHog?.capture('click_feedback')
                  window.open('https://isthatai.canny.io/', '_blank')
                }}
              >
                Send Feedback
              </MenuButton>
              <MenuButton
                onClick={() => {
                  postHog?.capture('click_logout')
                  logout()
                }}
                hoverTextColor="red"
              >
                Logout
              </MenuButton>
            </>
          ) : (
            <>
              <MenuButton
                onClick={() => {
                  postHog?.capture('click_ftue')
                  switchScene('WARM_UP')
                }}
              >
                Take a Sample Test
              </MenuButton>
              <MenuButton
                onClick={() => {
                  postHog?.capture('click_sign_in')
                  signInWithGoogle()
                }}
              >
                Sign In
              </MenuButton>
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-[80%] bg-white py-[10px] text-center text-[12px] text-[#989898] sm:py-[20px]">
        crafted by{' '}
        <a
          href="https://zolplay.com?utm_source=isthat.ai&utm_medium=referral&utm_campaign=isthat.ai"
          className="cursor-click text-[#626262] underline"
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            postHog?.capture('click_zolplay')
          }}
        >
          zolplay
        </a>
      </div>
    </div>
  )
}

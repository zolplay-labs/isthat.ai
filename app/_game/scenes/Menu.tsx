import Image from 'next/image'

import { useScene } from '~/stores/Scene.store'

import { BorderWithoutCorner } from '../components/BorderWithoutCorner'
import { MenuButton } from '../components/MenuButton'
import { PreloadImages } from '../components/PreloadImages'
import { useUser } from '../../../hooks/useUser'

export function Menu() {
  const { isSignedIn, logout, signInWithGoogle, user, setAvatarToDefault } =
    useUser()
  const { switchScene } = useScene()

  return (
    <div className="relative flex h-[100dvh] items-center justify-center bg-[url('/images/menu/screen.svg')] bg-cover bg-center bg-no-repeat">
      <PreloadImages />
      <div className="absolute top-[16%] flex w-[80%] items-center justify-between sm:w-[60%]">
        <a
          className="flex cursor-click items-baseline gap-[8px] sm:gap-[12px]"
          href="https://x.com/isthatai"
        >
          <div className="text-[12px] sm:text-[14px]">Follow on</div>
          <div className="text-[20px] sm:text-[30px]">𝕏</div>
        </a>
        {isSignedIn && user?.avatar && (
          <div className="relative">
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
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo.svg"
          alt="logo"
          className="h-[168px] w-[168px] sm:h-[200px] sm:w-[200px]"
          width={200}
          height={200}
          priority
        />
        <div className="mb-[50px] text-[14px] leading-[normal] sm:mb-[100px] sm:text-[24px]">
          isthat.ai
        </div>
        <div className="flex flex-col items-center gap-[24px] sm:gap-[44px]">
          {isSignedIn ? (
            <>
              <MenuButton onClick={() => switchScene('WARM_UP')}>
                Take Test
              </MenuButton>
              <MenuButton onClick={logout} hoverTextColor="red">
                Logout
              </MenuButton>
            </>
          ) : (
            <>
              <MenuButton onClick={() => switchScene('WARM_UP')}>
                Take a Sample Test
              </MenuButton>
              <MenuButton onClick={signInWithGoogle}>Sign In</MenuButton>
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-[80%] bg-white py-[10px] text-center text-[12px] text-[#989898] sm:py-[20px]">
        crafted by{' '}
        <a
          href="https://zolplay.com?utm_source=isthat.ai&utm_medium=referral&utm_campaign=isthat.ai"
          className="cursor-click text-[#626262] underline"
        >
          zolplay
        </a>
      </div>
    </div>
  )
}

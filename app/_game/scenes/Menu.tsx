import Image from 'next/image'

import { useScene } from '~/stores/Scene.store'

import { BorderWithoutCorner } from '../components/BorderWithoutCorner'
import { MenuButton } from '../components/MenuButton'
import { useUser } from '../hooks/useUser'

export function Menu() {
  const { isSignedIn, logout, signInWithGoogle, user, setAvatarToDefault } =
    useUser()
  const { switchScene } = useScene()

  return (
    <div className="relative flex h-[100dvh] items-center justify-center bg-[url('/images/menu/screen.svg')] bg-cover bg-center bg-no-repeat">
      {isSignedIn && user?.avatar && (
        <div className="absolute right-[5%] top-[16%] sm:right-[20%]">
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
                Start challenge
              </MenuButton>
              <MenuButton onClick={logout}>Logout</MenuButton>
            </>
          ) : (
            <>
              <MenuButton onClick={signInWithGoogle}>Sign In</MenuButton>
              <MenuButton onClick={() => switchScene('WARM_UP')}>
                Trial Play
              </MenuButton>
            </>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-[80%] bg-white py-[10px] text-center text-[12px] text-[#989898] sm:py-[20px]">
        Craft by{' '}
        <a
          href="https://zolplay.com"
          className="cursor-pointer text-[#626262] underline"
        >
          Zolplay
        </a>
      </div>
    </div>
  )
}

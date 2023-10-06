import Image from 'next/image'

import { useScene } from '~/stores/Scene.store'

import { MenuButton } from '../components/MenuButton'
import { useUser } from '../hooks/useUser'

export function Menu() {
  const { isSignedIn, logout, signInWithGoogle, user, setAvatarToDefault } =
    useUser()
  const { switchScene } = useScene()

  return (
    <div className="relative flex h-[100dvh] items-center justify-center bg-[url('/images/menu/screen.svg')] bg-cover bg-center bg-no-repeat">
      {isSignedIn && user?.avatar && (
        <div className="absolute right-[5%] top-[16%] border-[3px] border-white sm:right-[20%]">
          <div className="absolute left-[-3px] top-[-3px] h-[3px] w-[3px] bg-[#282828]" />
          <div className="absolute right-[-3px] top-[-3px] h-[3px] w-[3px] bg-[#282828]" />
          <div className="absolute bottom-[-3px] left-[-3px] h-[3px] w-[3px] bg-[#282828]" />
          <div className="absolute bottom-[-3px] right-[-3px] h-[3px] w-[3px] bg-[#282828]" />
          <Image
            src={user.avatar}
            alt="avatar"
            height={42}
            width={42}
            onError={setAvatarToDefault}
          />
        </div>
      )}
      <div className="flex flex-col items-center">
        <Image
          src="/images/logo.svg"
          alt="logo"
          className="h-[168px] w-[168px] sm:h-[200] sm:w-[200px]"
          width={200}
          height={200}
        />
        <div className="mb-[50px] text-[14px] leading-[normal] sm:mb-[100px] sm:text-[24px]">
          Isthat.ai
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
    </div>
  )
}

import Image from 'next/image'
import { forwardRef } from 'react'

interface GameLayoutProps {
  children: React.ReactNode
  header?: React.ReactNode
  className?: string
  headerRight?: React.ReactNode
}

export const GameLayout = forwardRef(
  (
    { children, header, className, headerRight }: GameLayoutProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div className="relative h-[100dvh] border-[12px] border-[#717171] p-[12px] sm:border-[24px] sm:bg-[#2D2D2D] sm:p-[34px]">
        <div className="absolute left-[-12px] top-[-12px] h-[12px] w-[12px] bg-black sm:left-[-24px] sm:top-[-24px] sm:h-[24px] sm:w-[24px] sm:bg-[#2D2D2D]" />
        <div className="absolute right-[-12px] top-[-12px] h-[12px] w-[12px] bg-black sm:right-[-24px] sm:top-[-24px] sm:h-[24px] sm:w-[24px] sm:bg-[#2D2D2D]" />
        <div className="absolute bottom-[-12px] left-[-12px] h-[12px] w-[12px] bg-black sm:bottom-[-24px] sm:left-[-24px] sm:h-[24px] sm:w-[24px] sm:bg-[#2D2D2D]" />
        <div className="absolute bottom-[-12px] right-[-12px] h-[12px] w-[12px] bg-black sm:bottom-[-24px] sm:right-[-24px] sm:h-[24px] sm:w-[24px] sm:bg-[#2D2D2D]" />
        <div className="relative h-full border-[10px] border-white bg-[#5A5A5A] px-[12px] sm:px-[32px]">
          <div className="absolute left-[-10px] top-[-10px] hidden h-[27px] w-[27px] bg-white sm:block" />
          <div className="absolute right-[-10px] top-[-10px] hidden h-[27px] w-[27px] bg-white sm:block" />
          <div className="absolute bottom-[-10px] left-[-10px] hidden h-[27px] w-[27px] bg-white sm:block" />
          <div className="absolute bottom-[-10px] right-[-10px] hidden h-[27px] w-[27px] bg-white sm:block" />
          <div className="absolute left-[-12px] top-[-12px] h-[12px] w-[12px] bg-black sm:left-[-10px] sm:top-[-10px] sm:h-[17px] sm:w-[17px] sm:bg-[#2D2D2D]" />
          <div className="absolute right-[-12px] top-[-12px] h-[12px] w-[12px] bg-black sm:right-[-10px] sm:top-[-10px] sm:h-[17px] sm:w-[17px] sm:bg-[#2D2D2D]" />
          <div className="absolute bottom-[-12px] left-[-12px] h-[12px] w-[12px] bg-black sm:bottom-[-10px] sm:left-[-10px] sm:h-[17px] sm:w-[17px] sm:bg-[#2D2D2D]" />
          <div className="absolute bottom-[-12px] right-[-12px] h-[12px] w-[12px] bg-black sm:bottom-[-10px] sm:right-[-10px] sm:h-[17px] sm:w-[17px] sm:bg-[#2D2D2D]" />
          <div className="flex h-[60px] items-center justify-between sm:h-[52px]">
            <div className="w-[24px] items-center text-[12px] sm:flex sm:w-[136px] sm:gap-[4px]">
              <Image
                src="/images/logo.svg"
                alt="logo"
                className="h-[24px] w-[24px]"
                width={24}
                height={24}
              />
              <span className="hidden sm:block">Isthat.ai</span>
            </div>
            <div className="text-center text-[12px] sm:text-[16px]">
              {header}
            </div>
            <div className="min-w-[24px] sm:min-w-[136px]">{headerRight}</div>
          </div>
          <div className="h-[calc(100%-72px)] bg-black sm:h-[calc(100%-84px)]">
            <div className="flex h-full items-center justify-center bg-[linear-gradient(#2d2d2d_1px,transparent_1px)] bg-[length:100%_16px] sm:bg-[length:100%_24px]">
              <div className={className} ref={ref}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
)

GameLayout.displayName = 'GameLayout'

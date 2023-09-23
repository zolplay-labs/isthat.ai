import { clsxm } from '@zolplay/utils'
import { motion, type MotionValue } from 'framer-motion'
import Image from 'next/image'

import { useMotionValueState } from '~/hooks/useMotionValueState'

export function LoadingComputer({
  progress,
}: {
  progress: MotionValue<number>
}) {
  // TODO: Use motion instead of state
  const currentProgress = useMotionValueState(progress)

  return (
    <div className="flex h-[400px] w-[335px] flex-col items-center bg-[url('/images/Loading/computer.svg')] bg-contain bg-no-repeat pt-[54px] sm:h-[700px] sm:w-[643px] sm:pt-[104px]">
      <div className="inline-flex flex-col items-center">
        <Image
          src="/images/logo.svg"
          alt="logo"
          className="h-[88px] w-[88px] sm:h-[168px] sm:w-[168px]"
          width={168}
          height={168}
        />
        <div className="text-[12px] leading-[normal] text-white sm:text-[24px]">
          Isthat.ai
        </div>
      </div>
      <div className="relative mb-[4px] mt-[12px] border-[1px] border-[#d9d9d9] p-[2px] sm:mb-[7px] sm:mt-[24px] sm:border-[2px] sm:p-[4px]">
        <div className="absolute left-[-1px] top-[-1px] h-[1px] w-[1px] bg-[#282828] sm:left-[-2px] sm:top-[-2px] sm:h-[2px] sm:w-[2px]" />
        <div className="absolute right-[-1px] top-[-1px] h-[1px] w-[1px] bg-[#282828] sm:right-[-2px] sm:top-[-2px] sm:h-[2px] sm:w-[2px]" />
        <div className="absolute bottom-[-1px] left-[-1px] h-[1px] w-[1px] bg-[#282828] sm:bottom-[-2px] sm:left-[-2px] sm:h-[2px] sm:w-[2px]" />
        <div className="absolute bottom-[-1px] right-[-1px] h-[1px] w-[1px] bg-[#282828] sm:bottom-[-2px] sm:right-[-2px] sm:h-[2px] sm:w-[2px]" />
        <div className="flex items-start gap-[2px] sm:gap-[4px]">
          {new Array(10).fill(null).map((_, i) => (
            <div
              key={i}
              className={clsxm(
                'h-[6px] w-[4px]  sm:h-[12px] sm:w-[8px]',
                currentProgress >= (i + 1) * 10 && 'bg-white'
              )}
            />
          ))}
        </div>
      </div>
      <div className="text-[6px] leading-[normal] text-white sm:text-[12px]">
        <motion.span>{progress}</motion.span>
        <span>%</span>
      </div>
    </div>
  )
}

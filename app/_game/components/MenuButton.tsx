import { clsxm } from '@zolplay/utils'

interface MenuButtonProps {
  children: string
  onClick: () => void
  hoverTextColor?: 'white' | 'red'
}

export function MenuButton({
  children,
  onClick,
  hoverTextColor = 'white',
}: MenuButtonProps) {
  return (
    <div
      className={clsxm(
        'group flex gap-[17px] text-center text-[14px] leading-[24px] sm:gap-[45px] sm:text-[32px] sm:leading-[48px]',
        hoverTextColor === 'white' && 'hover:text-white',
        hoverTextColor === 'red' && 'hover:text-[#D08888]'
      )}
    >
      <div className="hidden group-hover:block">&gt;</div>
      <button
        onClick={onClick}
        className={clsxm(
          'block cursor-click text-[#929292]',
          hoverTextColor === 'white' && 'group-hover:text-white',
          hoverTextColor === 'red' && 'group-hover:text-[#D08888]'
        )}
      >
        {children}
      </button>
      <div className="hidden group-hover:block">&lt;</div>
    </div>
  )
}

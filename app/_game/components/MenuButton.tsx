interface MenuButtonProps {
  children: string
  onClick: () => void
}

export function MenuButton({ children, onClick }: MenuButtonProps) {
  return (
    <div className="group flex gap-[17px] text-center text-[14px] leading-[24px] sm:gap-[45px] sm:text-[32px] sm:leading-[48px]">
      <div className="hidden select-none group-hover:block">&gt;</div>
      <button
        onClick={onClick}
        className="block cursor-pointer text-[#929292] group-hover:text-white"
      >
        {children}
      </button>
      <div className="hidden select-none group-hover:block">&lt;</div>
    </div>
  )
}

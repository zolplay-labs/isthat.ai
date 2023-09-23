import { clsxm } from '@zolplay/utils'
import { Manrope } from 'next/font/google'

const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' })

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // FIXME: Set dialog font to manrope
  return <div className={clsxm(manrope.className, 'bg-white')}>{children}</div>
}

import '~/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { clsxm } from '@zolplay/utils'
import { type Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Is That AI',
}

const pressStart2P = Press_Start_2P({ weight: '400', subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={clsxm(pressStart2P.className, 'font-sans antialiased')}
        suppressHydrationWarning
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}

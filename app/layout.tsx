import '~/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { clsxm } from '@zolplay/utils'
import { type Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'

export const metadata: Metadata = {
  title: 'Is That AI',
  description: 'Is That AI description',
  openGraph: {
    title: 'Is That AI',
    description: 'Is That AI description',
    url: 'https://beta.isthat.ai',
    siteName: 'Is That AI',
    images: [
      {
        url: '/images/og.png',
        width: 1280,
        height: 832,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Is That AI',
    description: 'Is That AI description',
    site: '@zolplay',
    creator: '@zolplay',
    images: ['/images/og.png'],
  },
  viewport: {
    height: 'device-height',
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={clsxm(
          pressStart2P.variable,
          'bg-black text-white antialiased'
        )}
        suppressHydrationWarning
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}

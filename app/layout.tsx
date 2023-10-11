import '~/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { clsxm } from '@zolplay/utils'
import { type Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'

const title = 'isthat.ai'
const description = "Reality's art or AI's smart? Take the challenge."

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: 'https://isthat.ai',
    siteName: title,
    images: [
      {
        url: '/images/social/og.png',
        width: 1200,
        height: 675,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@zolplay',
    creator: '@zolplay',
    images: ['/images/social/og.png'],
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
          'cursor-default select-none bg-black text-white antialiased'
        )}
        suppressHydrationWarning
      >
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}

import '~/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { Analytics } from '@vercel/analytics/react'
import { clsxm } from '@zolplay/utils'
import { type Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'

const title = 'isthat.ai'
const description = 'A.I. or not? The image Turing test for humans'

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
    site: '@isthatai',
    creator: '@isthatai',
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
  // alternates: {
  //   preload: '/cursors/default.svg',
  // },
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
        <head>
          <link rel="preload" as="image" href="/cursors/default.svg" />
          <link rel="preload" as="image" href="/cursors/pointer.svg" />
          <link rel="preload" as="image" href="/cursors/grab.svg" />
          <link rel="preload" as="image" href="/cursors/loading.svg" />
        </head>
        <body>
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}

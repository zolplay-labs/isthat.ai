import '~/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { clsxm } from '@zolplay/utils'
import { type Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import { Suspense } from 'react'

import { PostHogPageview, Provider as PostHogProvider } from './PostHogProvider'

const title = 'IsThat.AI?'
const description =
  'The image Turing test for humans. Test your A.I. detection skills!'

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
          <link rel="preload" as="image" href="/cursors/loading.svg" />
          <link rel="preload" as="image" href="/cursors/grab.svg" />
          <link rel="preload" as="image" href="/cursors/grabbing.svg" />
        </head>
        <Suspense>
          <PostHogPageview />
        </Suspense>
        <PostHogProvider>
          <body>{children}</body>
        </PostHogProvider>
      </html>
    </ClerkProvider>
  )
}

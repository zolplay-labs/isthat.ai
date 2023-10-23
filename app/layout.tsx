import '~/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { clsxm } from '@zolplay/utils'
import { type Metadata } from 'next'
import { Press_Start_2P } from 'next/font/google'
import { Suspense } from 'react'

import { url } from '~/lib/url'
import {
  PostHogPageview,
  Provider as PostHogProvider,
} from '~/providers/PostHogProvider'

const title = 'IsThat.AI?'
const description =
  'The image Turing test for humans. Test your A.I. detection skills!'

export const runtime = 'edge'

const isProduction = process.env.VERCEL_ENV === 'production'
export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(
    isProduction ? 'https://isthat.ai' : 'https://beta.isthat.ai'
  ),
  keywords: [
    'ai image',
    'ai image test',
    'AI image turing test',
    'isthatai',
    'is that ai',
    'is that ai?',
    'isthatai?',
  ],
  openGraph: {
    title,
    description,
    url: url(''),
    siteName: title,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    site: '@isthatai',
    creator: '@isthatai',
  },
  viewport: {
    height: 'device-height',
    width: 'device-width',
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  manifest: '/site.webmanifest',
  robots: {
    index: isProduction,
    follow: isProduction,
    googleBot: {
      index: isProduction,
      follow: isProduction,
    },
  },
  alternates: {
    canonical: url('/'),
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

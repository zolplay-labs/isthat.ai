import '~/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { type Metadata } from 'next'
import { Manrope } from 'next/font/google'

import { ThemeProvider } from '~/app/ThemeProvider'

export const metadata: Metadata = {
  title: 'Is That AI',
}

const fontSans = Manrope({ subsets: ['latin'], variable: '--font-sans' })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} font-sans antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-neutral-50 tracking-tight text-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>{children}</ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

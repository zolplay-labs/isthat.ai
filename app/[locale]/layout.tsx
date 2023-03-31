import '~/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'

import { IntlProvider } from '~/app/IntlProvider'
import { ThemeProvider } from '~/app/ThemeProvider'
import { getMessages, i18n } from '~/i18n'
import { appMetadata } from '~/translations/metadata'

export function generateStaticPaths() {
  return i18n.locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params }: { params: RootParams }) {
  return appMetadata[params.locale]
}

const fontSans = Inter({ subsets: ['latin'], variable: '--font-sans' })

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: RootParams
}) {
  let messages
  try {
    messages = await getMessages(params)
  } catch (error) {
    notFound()
  }

  return (
    <html lang={params.locale} className={`${fontSans.variable} font-sans`}>
      <body className="bg-stone-50 text-stone-800 dark:bg-stone-900 dark:text-stone-300">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <IntlProvider locale={params.locale} messages={messages}>
            <ClerkProvider>{children}</ClerkProvider>
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

import '~/app/globals.css'

import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { Manrope } from 'next/font/google'
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

const fontSans = Manrope({ subsets: ['latin'], variable: '--font-sans' })

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
    <html
      lang={params.locale}
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
          <IntlProvider locale={params.locale} messages={messages}>
            <ClerkProvider>{children}</ClerkProvider>
          </IntlProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

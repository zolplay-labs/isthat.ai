'use client'

import { AbstractIntlMessages } from 'next-intl'
import { NextIntlClientProvider } from 'next-intl/client'

type Props = {
  messages: AbstractIntlMessages
  locale: string
  children: React.ReactNode
}

export function IntlProvider({ messages, locale, children }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}

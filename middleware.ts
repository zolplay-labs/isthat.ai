import { withClerkMiddleware } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { createIntlMiddleware } from 'next-intl/server'

import { i18n } from '~/i18n'

const intlMiddleware = createIntlMiddleware({
  locales: i18n.locales,
  defaultLocale: i18n.defaultLocale,
})

export default withClerkMiddleware((req: NextRequest) => {
  return intlMiddleware(req)
})

// Stop Middleware running on static files and public folder
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - assets
     * - static
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|assets).*)',
    '/',
  ],
}

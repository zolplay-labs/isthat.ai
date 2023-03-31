import { i18n } from '~/i18n'

/**
 * Make a route for the given locale.
 *
 * @param path Path to the route
 * @param locale Locale to use
 * @returns The route for the given locale
 */
export function makeRoute(path: string, locale: string) {
  if (!i18n.locales.includes(locale)) {
    return path
  }

  return `/${locale}${path}`
}

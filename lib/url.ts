export function url(path = '') {
  const baseUrl =
    process.env.VERCEL_ENV === 'production' ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? 'https://isthat.ai'
      : 'https://beta.isthat.ai'

  return new URL(path, baseUrl)
}

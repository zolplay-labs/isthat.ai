export function url(path = '') {
  const baseUrl =
    process.env.VERCEL_ENV === 'production'
      ? 'https://isthat.ai'
      : 'http://beta.isthat.ai'

  return new URL(path, baseUrl)
}

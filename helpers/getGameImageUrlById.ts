import { env } from '~/env.mjs'

export const getGameImageUrlById = (id: string) => {
  return `https://imagedelivery.net/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}/${id}/public`
}

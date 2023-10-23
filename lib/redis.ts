import { Redis } from '@upstash/redis'

import { env } from '~/env.mjs'

export const redis =
  env.UPSTASH_URL && env.UPSTASH_TOKEN
    ? new Redis({
        url: env.UPSTASH_URL,
        token: env.UPSTASH_TOKEN,
      })
    : undefined

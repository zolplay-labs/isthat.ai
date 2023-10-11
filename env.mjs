import { createEnv } from '@t3-oss/env-nextjs'
// import * as dotenv from 'dotenv'
import { z } from 'zod'

// dotenv.config()

export const env = createEnv({
  server: {
    DATABASE_NAME: z.string().min(1),
    DATABASE_HOST: z.string().min(1),
    DATABASE_USERNAME: z.string().min(1),
    DATABASE_PASSWORD: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    CLOUDFLARE_API_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH: z.string().min(1),
    NEXT_PUBLIC_SQIDS_ALPHABET: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID:
      process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID,
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH:
      process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH,
    NEXT_PUBLIC_SQIDS_ALPHABET: process.env.NEXT_PUBLIC_SQIDS_ALPHABET,
  },
})

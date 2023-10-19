import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    DATABASE_NAME: z.string().min(1),
    DATABASE_HOST: z.string().min(1),
    DATABASE_USERNAME: z.string().min(1),
    DATABASE_PASSWORD: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    CLOUDFLARE_API_TOKEN: z.string().min(1),
    HOSTNAME: z.string().min(1),
    UPSTASH_URL: z.string().optional(),
    UPSTASH_TOKEN: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID: z.string().min(1),
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH: z.string().min(1),
    NEXT_PUBLIC_SQIDS_ALPHABET: z.string().min(1),
    NEXT_PUBLIC_ACTIVE_QUESTIONS_LIMIT: z.coerce.number().min(1),
    NEXT_PUBLIC_QUESTIONS_PER_CHALLENGE: z.coerce.number().min(1),
    NEXT_PUBLIC_REFRESH_INTERVAL_HOURS: z.coerce.number().min(1).max(24),
    NEXT_PUBLIC_RELEASE_DATE: z.string().length(8),
    NEXT_PUBLIC_POSTHOG_KEY: z.string().optional(),
    NEXT_PUBLIC_POSTHOG_HOST: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID:
      process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID,
    NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH:
      process.env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH,
    NEXT_PUBLIC_SQIDS_ALPHABET: process.env.NEXT_PUBLIC_SQIDS_ALPHABET,
    NEXT_PUBLIC_ACTIVE_QUESTIONS_LIMIT:
      process.env.NEXT_PUBLIC_ACTIVE_QUESTIONS_LIMIT,
    NEXT_PUBLIC_QUESTIONS_PER_CHALLENGE:
      process.env.NEXT_PUBLIC_QUESTIONS_PER_CHALLENGE,
    NEXT_PUBLIC_REFRESH_INTERVAL_HOURS:
      process.env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS,
    NEXT_PUBLIC_RELEASE_DATE: process.env.NEXT_PUBLIC_RELEASE_DATE,
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  },
})

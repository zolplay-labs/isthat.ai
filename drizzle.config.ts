import type { Config } from 'drizzle-kit'

import { env } from './env.mjs'

export default {
  schema: './db/schema.ts',
  out: './db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: `mysql://${env.DATABASE_USERNAME}:${env.DATABASE_PASSWORD}@${env.DATABASE_HOST}/${env.DATABASE_NAME}?ssl={"rejectUnauthorized":true}`,
  },
} satisfies Config

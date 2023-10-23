# isthat.ai

## Development

1. Install dependencies

```bash
pnpm i
```

2. Pull `.env` file from vercel

```bash
vercel env pull .env
```

3. (Optional) Initialize database

```bash
pnpm run db:push
```

4. Run dev server

```bash
pnpm run dev
```

## Access Admin Panel

1. Sign in or sign up an account
2. Go to clerk dashboard
   1. Find app and select the instance
   2. Go to `Users`
   3. Find your account and `View profile`
   4. Add `{ "isAdmin": true }` in public metadata
3. Visit `/admin`

# Isthat.ai

## Development

1. Install dependencies

```bash
pnpm i
```

2. Add `.env` file

   1. Copy `.env.example` and rename it to `.env`
   2. Edit `.env`.

3. Initialize database

> **Note**  
> If your database is not empty, just run `pnpm run db:generate` to generate types

```bash
# Push database
pnpm run db:push
# Seed database
pnpm run db:seed
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

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

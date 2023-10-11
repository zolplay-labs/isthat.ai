'use server'

import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '~/db'
import { type Config } from '~/db/queries'
import { config, questions } from '~/db/schema'
import { env } from '~/env.mjs'

export async function updateQuestionAI({
  id,
  isAIGenerated,
}: {
  id: number
  isAIGenerated: boolean
}) {
  await db.update(questions).set({ isAIGenerated }).where(eq(questions.id, id))
  revalidatePath('/admin')
}

export async function deleteQuestion({
  id,
  image,
}: {
  id: number
  image: string
}) {
  const url = `https://api.cloudflare.com/client/v4/accounts/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1/${image}`
  const fetchRes = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + env.CLOUDFLARE_API_TOKEN,
    },
  })
  const res: { success: boolean } = await fetchRes.json()
  if (!res.success) {
    throw new Error('Cloudflare Error')
  }
  await db.delete(questions).where(eq(questions.id, id))
  revalidatePath('/admin')
}

export async function reactivateQuestion({ id }: { id: number }) {
  const maxIdRow = await db
    .select({ id: questions.id })
    .from(questions)
    .orderBy(desc(questions.id))
    .limit(1)
  await db
    .update(questions)
    .set({ id: (maxIdRow[0]?.id || 0) + 1 })
    .where(eq(questions.id, id))
  revalidatePath('/admin')
}

export async function changeConfig({
  releaseDate,
  activeQuestionsLimit,
  questionsPerChallenge,
  refreshIntervalHours,
}: Config) {
  await db
    .update(config)
    .set({
      releaseDate,
      activeQuestionsLimit,
      questionsPerChallenge,
      refreshIntervalHours,
    })
    .where(eq(config.id, 'single'))
  revalidatePath('/admin')
}

type CloudflareUploadResponse = {
  success: boolean
  result: {
    filename: string
    id: string
    requireSignedURLs: boolean
    uploaded: string
    variants: string[]
  }
}

export async function uploadQuestion(data: FormData) {
  // Upload image to cloudflare
  const url = `https://api.cloudflare.com/client/v4/accounts/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_ID}/images/v1`
  const fetchRes = await fetch(url, {
    body: data,
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + env.CLOUDFLARE_API_TOKEN,
    },
  })
  const res: CloudflareUploadResponse = await fetchRes.json()
  if (!res.success) {
    throw new Error('Cloudflare Error')
  }
  // Add image to database
  await db.insert(questions).values({ image: res.result.id })
  revalidatePath('/admin')
}

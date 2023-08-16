'use server'

import { eq, type InferModel } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '~/db'
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

export async function deleteQuestion({ id }: { id: number }) {
  await db.delete(questions).where(eq(questions.id, id))
  revalidatePath('/admin')
}

export async function reactivateQuestion({ id }: { id: number }) {
  await db
    .update(questions)
    .set({ createdAt: new Date() })
    .where(eq(questions.id, id))
  revalidatePath('/admin')
}

export async function changeConfig({
  releaseDate,
  activeQuestionsLimit,
  questionsPerChallenge,
}: Omit<InferModel<typeof config, 'select'>, 'id'>) {
  await db
    .update(config)
    .set({ releaseDate, activeQuestionsLimit, questionsPerChallenge })
    .where(eq(config.id, 'single'))
  revalidatePath('/admin')
}

type CloudflareResponse = {
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
    method: 'post',
    headers: {
      Authorization: 'Bearer ' + env.CLOUDFLARE_API_TOKEN,
    },
  })
  const res: CloudflareResponse = await fetchRes.json()
  if (!res.success) {
    throw new Error('Cloudflare Error')
  }
  // Add image to database
  await db.insert(questions).values({ image: res.result.id })
  revalidatePath('/admin')
}

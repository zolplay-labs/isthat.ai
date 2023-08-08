'use server'

import { eq, type InferModel } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '~/db'
import { config, questions } from '~/db/schema'

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

export async function changeConfig({
  releaseDate,
  activeQuestionsLimit,
  questionsPerChallenge,
}: Omit<InferModel<typeof config, 'select'>, 'id'>) {
  await db
    .update(config)
    .set({ releaseDate, activeQuestionsLimit, questionsPerChallenge })
    .where(eq(config.id, 'single'))
  // TODO: Use new limit to expire questions
  revalidatePath('/admin')
}

export async function reactivateQuestion({ id }: { id: number }) {
  // Refresh creation date
  await db
    .update(questions)
    .set({ createdAt: new Date() })
    .where(eq(questions.id, id))
  // Expire the last active question
  revalidatePath('/admin')
}

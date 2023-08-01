'use server'

import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

import { db } from '~/db'
import { questions } from '~/db/schema'

export async function updateQuestionAI({
  id,
  isAIGenerated,
}: {
  id: number
  isAIGenerated: boolean
}) {
  await db.update(questions).set({ isAIGenerated }).where(eq(questions.id, id))
  revalidatePath('/admin/question-list')
}

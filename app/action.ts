'use server'

import { auth } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'

import { db } from '~/db'
import { questions, userScores } from '~/db/schema'

import { type Answers } from './_game/scenes/ResultWaiting'

export async function checkAnswers(answers: Answers) {
  let score = 0
  await Promise.all(
    answers.map(async (answer) => {
      const [questionRow] = await db
        .select({ isAIGenerated: questions.isAIGenerated })
        .from(questions)
        .where(eq(questions.image, answer.image))
      if (answer.AI === questionRow?.isAIGenerated) {
        score++
      }
    })
  )
  return { score }
}

export async function saveScore(score: number, time: number, total: number) {
  const { userId } = auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  await db.insert(userScores).values({ score, userId, time, total })

  const [scoreIdRow] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.userId, userId))
    .orderBy(desc(userScores.createdAt))
    .limit(1)
  const scoreId = scoreIdRow?.id || -1

  return { scoreId }
}

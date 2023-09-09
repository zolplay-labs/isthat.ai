'use server'

import { auth } from '@clerk/nextjs'
import { eq, sql } from 'drizzle-orm'

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

export async function saveScore(score: number, time: number) {
  const { userId } = auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  const [prevChallengeDayRow] = await db
    .select({ challengeDay: sql<number>`max(${userScores.challengeDays})` })
    .from(userScores)
    .where(eq(userScores.userId, userId))
  const prevChallengeDay = prevChallengeDayRow?.challengeDay || 0
  const challengeDays = prevChallengeDay + 1
  await db.insert(userScores).values({ score, userId, challengeDays, time })
  return { challengeDays }
}

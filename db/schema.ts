import { relations } from 'drizzle-orm'
import {
  boolean,
  datetime,
  int,
  mysqlTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

export const challenges = mysqlTable('challenges', {
  id: serial('id').primaryKey(),
  date: datetime('date').unique(),
})

export const challengesRelations = relations(challenges, ({ many }) => ({
  questions: many(questions),
}))

export const questions = mysqlTable('questions', {
  id: serial('id').primaryKey(),
  image: varchar('image', { length: 191 }),
  isAIGenerated: boolean('is_ai_generated'),
  challengeId: int('challenge_id'),
})

export const questionsRelations = relations(questions, ({ one }) => ({
  challenge: one(challenges, {
    fields: [questions.challengeId],
    references: [challenges.id],
  }),
}))

export const userScores = mysqlTable('userScores', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 191 }),
  score: int('score'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

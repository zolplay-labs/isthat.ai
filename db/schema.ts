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

export const trueOrFalseChallenges = mysqlTable('trueOrFalseChallenges', {
  id: serial('id').primaryKey(),
  date: datetime('date').unique(),
})

export const trueOrFalseChallengesRelations = relations(
  trueOrFalseChallenges,
  ({ many }) => ({ questions: many(trueOrFalseQuestions) })
)

export const trueOrFalseQuestions = mysqlTable('trueOrFalseQuestions', {
  id: serial('id').primaryKey(),
  imageUrl: varchar('image_url', { length: 191 }),
  isAIGenerated: boolean('is_ai_generated'),
  trueOrFalseChallengeId: int('true_or_false_challenge_id'),
})

export const trueOrFalseQuestionsRelations = relations(
  trueOrFalseQuestions,
  ({ one }) => ({
    challenge: one(trueOrFalseChallenges, {
      fields: [trueOrFalseQuestions.trueOrFalseChallengeId],
      references: [trueOrFalseChallenges.id],
    }),
  })
)

export const userScores = mysqlTable('userScores', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 191 }),
  score: int('score'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow(),
})

import { relations } from 'drizzle-orm'
import {
  boolean,
  int,
  mysqlTable,
  primaryKey,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

export const questions = mysqlTable('questions', {
  id: serial('id').primaryKey(),
  image: varchar('image', { length: 191 }).notNull(),
  isAIGenerated: boolean('is_ai_generated').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const questionsRelations = relations(questions, ({ many }) => ({
  questionsToTests: many(questionsToTests),
}))

export const tests = mysqlTable('tests', { id: int('id').primaryKey() })

export const testsRelations = relations(tests, ({ many }) => ({
  questionsToTests: many(questionsToTests),
}))

export const questionsToTests = mysqlTable(
  'questions_to_tests',
  {
    questionId: int('question_id').notNull(),
    testId: int('test_id').notNull(),
  },
  (t) => ({ pk: primaryKey(t.questionId, t.testId) })
)

export const questionsToTestsRelations = relations(
  questionsToTests,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionsToTests.questionId],
      references: [questions.id],
    }),
    test: one(tests, {
      fields: [questionsToTests.testId],
      references: [tests.id],
    }),
  })
)

export const userScores = mysqlTable('userScores', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 191 }).notNull(),
  score: int('score').notNull(),
  total: int('total').notNull(),
  time: int('time').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

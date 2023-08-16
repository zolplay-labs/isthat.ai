import {
  boolean,
  date,
  int,
  mysqlEnum,
  mysqlTable,
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

export const userScores = mysqlTable('userScores', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 191 }).notNull(),
  score: int('score').notNull(),
  challengeDays: int('challenge_days').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
})

// TODO: Auto create default config
export const config = mysqlTable('config', {
  id: mysqlEnum('id', ['single']).default('single').primaryKey(),
  releaseDate: date('release_date').default(new Date('2023-7-25')).notNull(),
  activeQuestionsLimit: int('active_questions_limit').default(100).notNull(),
  questionsPerChallenge: int('questions_per_challenge').default(12).notNull(),
})

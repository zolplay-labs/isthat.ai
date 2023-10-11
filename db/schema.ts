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
  total: int('total').notNull(),
  challengeDays: int('challenge_days').notNull(),
  time: int('time').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export const config = mysqlTable('config', {
  id: mysqlEnum('id', ['single']).default('single').primaryKey(),
  releaseDate: date('release_date').default(new Date('2023-7-25')).notNull(),
  activeQuestionsLimit: int('active_questions_limit').default(100).notNull(),
  questionsPerChallenge: int('questions_per_challenge').default(8).notNull(),
  refreshIntervalHours: int('refresh_interval_hours').default(12).notNull(),
})

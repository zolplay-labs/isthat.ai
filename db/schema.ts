import {
  boolean,
  int,
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
  time: int('time').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

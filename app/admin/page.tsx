import { UserButton } from '@clerk/nextjs'
import { Bold, Card, Subtitle, Text, Title } from '@tremor/react'
import { desc } from 'drizzle-orm'
import { type Metadata } from 'next'

import { db } from '~/db'
import { fetchQuestionCount } from '~/db/queries'
import { questions } from '~/db/schema'
import { env } from '~/env.mjs'

import { ConfigDialog } from './_components/ConfigDialog'
import { QuestionList } from './_components/QuestionList'
import { QuestionPagination } from './_components/QuestionPagination'
import { UploadQuestionsDialog } from './_components/UploadQuestionsDialog'
import { PAGE_SIZE } from './constants'

export const metadata: Metadata = {
  title: 'Admin Panel - isthat.ai',
  robots: 'noindex',
}

export default async function Admin({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const currentPage = Number(searchParams?.page) || 1

  const questionsData = await db
    .select()
    .from(questions)
    .orderBy(desc(questions.id))
    .limit(PAGE_SIZE)
    .offset((currentPage - 1) * PAGE_SIZE)
  const questionCount = await fetchQuestionCount()

  const activeQuestionLimitIdRow = await db
    .select({ id: questions.id })
    .from(questions)
    .orderBy(desc(questions.id))
    .offset(env.NEXT_PUBLIC_ACTIVE_QUESTIONS_LIMIT - 1)
    .limit(1)
  const activeQuestionsLimitId = activeQuestionLimitIdRow[0]?.id || 0

  return (
    <main className="container space-y-4 px-8 py-4">
      <div className="flex">
        <div className="flex-1">
          <Title>Admin Panel</Title>
          <Subtitle>isthat.ai</Subtitle>
        </div>
        <div className="mt-1">
          <UserButton />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between">
        <UploadQuestionsDialog />
        <div className="flex items-baseline gap-2">
          <Bold>Total Questions: </Bold>
          <Text>{questionCount}</Text>
        </div>
        <ConfigDialog />
      </div>
      <Card>
        <QuestionList
          questions={questionsData}
          activeQuestionsLimitId={activeQuestionsLimitId}
        />
      </Card>
      <QuestionPagination
        currentPage={currentPage}
        questionCount={questionCount}
      />
    </main>
  )
}

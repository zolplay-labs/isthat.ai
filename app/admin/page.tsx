import { UserButton } from '@clerk/nextjs'
import { Card, Text, Title } from '@tremor/react'
import { desc } from 'drizzle-orm'
import { type Metadata } from 'next'

import { ConfigDialog } from '~/app/admin/_components/ConfigDialog'
import { db } from '~/db'
import { fetchConfig, fetchQuestionCount } from '~/db/queries'
import { questions } from '~/db/schema'

import { ConfigDisplay } from './_components/ConfigDisplay'
import { QuestionList } from './_components/QuestionList'
import { QuestionPagination } from './_components/QuestionPagination'
import { UploadQuestionsDialog } from './_components/UploadQuestionsDialog'
import { PAGE_SIZE } from './constants'

export const metadata: Metadata = {
  title: 'Admin Panel - Is That AI',
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
  const configData = await fetchConfig()
  const questionCount = await fetchQuestionCount()

  const activeQuestionLimitIdRow = await db
    .select({ id: questions.id })
    .from(questions)
    .orderBy(desc(questions.id))
    .offset(configData.activeQuestionsLimit - 1)
    .limit(1)
  const activeQuestionsLimitId = activeQuestionLimitIdRow[0]?.id || 0

  return (
    <main className="container space-y-4 px-8 py-4">
      <div className="flex">
        <div className="flex-1">
          <Title>Admin Panel</Title>
          <Text>Is That AI</Text>
        </div>
        <div className="mt-1">
          <UserButton />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 sm:flex-row sm:justify-between ">
        <UploadQuestionsDialog />
        <ConfigDisplay configData={configData} questionCount={questionCount} />
        <ConfigDialog configData={configData} />
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

import { UserButton } from '@clerk/nextjs'
import { Card, Text, Title } from '@tremor/react'
import { type Metadata } from 'next'

import { ConfigDialog } from '~/components/admin/ConfigDialog'
import { ConfigDisplay } from '~/components/admin/ConfigDisplay'
import { QuestionList } from '~/components/admin/QuestionList'
import { UploadQuestionsDialog } from '~/components/admin/UploadQuestionsDialog'
import { db } from '~/db'
import { questions } from '~/db/schema'

export const metadata: Metadata = {
  title: 'Admin Panel - Is That AI',
  robots: 'noindex',
}

export default async function Admin() {
  const questionsData = await db.select().from(questions)

  return (
    <main className="container px-8 pt-4">
      <div className="flex">
        <div className="flex-1">
          <Title>Admin Panel</Title>
          <Text>Is That AI</Text>
        </div>
        <div className="mt-1">
          <UserButton />
        </div>
      </div>
      <div className="my-4 flex flex-col items-center gap-2 sm:flex-row sm:justify-between ">
        <UploadQuestionsDialog />
        <ConfigDisplay />
        <ConfigDialog />
      </div>
      <Card>
        <QuestionList questions={questionsData} />
      </Card>
    </main>
  )
}

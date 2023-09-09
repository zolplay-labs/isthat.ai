'use client'

import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@tremor/react'
import Image from 'next/image'
import { useTransition } from 'react'

import {
  deleteQuestion,
  reactivateQuestion,
  updateQuestionAI,
} from '~/app/admin/action'
import { type questions } from '~/db/schema'
import { env } from '~/env.mjs'
import { dialog } from '~/lib/dialog'

import { Switch } from './ui/Switch'

type Question = typeof questions.$inferSelect

function AISwitch({ question }: { question: Question }) {
  const [isPending, startTransition] = useTransition()

  return (
    <Switch
      checked={question.isAIGenerated}
      onChange={(checked) => {
        startTransition(() =>
          updateQuestionAI({
            id: question.id,
            isAIGenerated: checked,
          })
        )
      }}
      disabled={isPending}
    />
  )
}

function Actions({
  question,
  isActive,
}: {
  question: Question
  isActive: boolean
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <>
      {!isActive && (
        <Button
          size="xs"
          variant="secondary"
          color="orange"
          disabled={isPending}
          onClick={async () => {
            const { isConfirmed } = await dialog.fire({
              icon: 'info',
              title: 'Are you sure?',
              text: 'Reactivation will refresh the question id and expire the last active question',
              confirmButtonText: 'Yes, reactivate it!',
              showCancelButton: true,
              confirmButtonColor: '#f97316',
              focusCancel: true,
            })
            if (isConfirmed) {
              startTransition(() => reactivateQuestion({ id: question.id }))
            }
          }}
        >
          Reactivate
        </Button>
      )}
      <Button
        size="xs"
        variant="secondary"
        color="red"
        disabled={isPending}
        onClick={async () => {
          const { isConfirmed } = await dialog.fire({
            icon: 'warning',
            title: 'Are you sure to delete this question?',
            confirmButtonText: 'Yes, delete it!',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            focusCancel: true,
          })
          if (isConfirmed) {
            startTransition(() =>
              deleteQuestion({ id: question.id, image: question.image })
            )
          }
        }}
      >
        Delete
      </Button>
    </>
  )
}

export function QuestionList({
  questions,
  activeQuestionsLimitId,
}: {
  questions: Question[]
  activeQuestionsLimitId: number
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Image</TableHeaderCell>
          <TableHeaderCell>AI</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell>Actions</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {questions.map((question) => (
          <TableRow key={question.id}>
            <TableCell width="400px">
              {/* FIXME: Image with src "<url>" has either width or height modified, but not the other. If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio. */}
              <Image
                src={`https://imagedelivery.net/${env.NEXT_PUBLIC_CLOUDFLARE_ACCOUNT_HASH}/${question.image}/public`}
                alt={`Question ${question.image}`}
                width={200}
                height={0}
                quality={1}
              />
            </TableCell>
            <TableCell>
              <AISwitch question={question} />
            </TableCell>
            <TableCell>
              {question.id >= activeQuestionsLimitId ? (
                <Badge size="xs" color="green">
                  Active
                </Badge>
              ) : (
                <Badge size="xs" color="orange">
                  Expired
                </Badge>
              )}
            </TableCell>
            <TableCell className="space-x-2">
              <Actions
                question={question}
                isActive={question.id >= activeQuestionsLimitId}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

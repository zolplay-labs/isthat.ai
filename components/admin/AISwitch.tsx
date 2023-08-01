'use client'

import { type InferModel } from 'drizzle-orm'
import { useTransition } from 'react'

import { updateQuestionAI } from '~/app/admin/action'
import { type questions } from '~/db/schema'

import { Switch } from '../ui/Switch'

export function AISwitch({
  question,
}: {
  question: InferModel<typeof questions, 'select'>
}) {
  const [isPending, startTransition] = useTransition()

  return (
    <Switch
      checked={question.isAIGenerated}
      onChange={(checked) => {
        startTransition(
          () =>
            void updateQuestionAI({
              id: question.id,
              isAIGenerated: checked,
            })
        )
      }}
      disabled={isPending}
    />
  )
}

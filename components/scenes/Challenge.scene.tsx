'use client'

import { createInsertSchema } from 'drizzle-zod'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { type z } from 'zod'

import { type SwipeType, TinderCard } from '~/components/cards/TinderCard'
import { questions } from '~/db/schema'

const insertQuestionSchema = createInsertSchema(questions)
type Question = z.infer<typeof insertQuestionSchema>

const fakeQuestions: Required<Question>[] = [
  {
    id: 0,
    image: 'v1680589315/isthatai/twitter_Frunud3XsAAYLzN_tncsag.jpg',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 1,
    image: 'v1680591237/isthatai/twitter_FrupVjpXwAMqnLf_qrvxlh.jpg',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 2,
    image: 'v1680592659/isthatai/aslff_ik2BN5dI6tE_ngizwq.jpg',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 3,
    image: 'v1680591243/isthatai/twitter_Frupv0zWYAMr6vH_nzvupz.jpg',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 4,
    image: 'v1680591296/isthatai/Preview_2023-04-04_at_13.23.27_2x_thh70j.png',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 5,
    image: 'v1680592659/isthatai/ho7e8JYEo3w_c_a_tmjfz8.jpg',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 6,
    image: 'v1680592888/isthatai/az01fffaszx-00355-3543856038_mx5ytx.png',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 7,
    image: 'v1680592933/isthatai/fooizxffa-saf00046-1647037626_uwjsxb.png',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 8,
    image: 'v1680592963/isthatai/lxzasf-FsJXJ1gWYAELOSF_f9sibh.jpg',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 9,
    image: 'v1680593331/isthatai/sllzxf-oZruO3BLdgY_yphgnr.jpg',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 10,
    image: 'v1680593331/isthatai/xasfokssaflkj-SKGZlBmRtYY_k9iwyt.jpg',
    isAIGenerated: true,
    challengeId: 0,
  },
  {
    id: 11,
    image: 'v1680593331/isthatai/safjlzx-asfaslfkk2uatp_87tQ_kmkxqe.jpg',
    isAIGenerated: true,
    challengeId: 0,
  },
]

export function ChallengeScene() {
  const [index, setIndex] = React.useState(fakeQuestions.length - 1)
  const [questions, setQuestions] = React.useState(fakeQuestions)
  const [score, setScore] = React.useState(0)
  const onSwiped = React.useCallback(
    (index: number, swipe: SwipeType) => {
      if (
        (swipe === 'yes' && questions[index]?.isAIGenerated) ||
        (swipe === 'no' && !questions[index]?.isAIGenerated)
      ) {
        setScore((score) => score + 1)
      }

      setQuestions(questions.slice(0, -1))
      setIndex(Math.max(-1, index - 1))
    },
    [questions]
  )

  return (
    <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-between p-3">
      <header className="my-4 text-2xl font-bold">
        Is this image generated by AI?
      </header>

      <div className="relative flex flex-1 flex-col items-center justify-center">
        <AnimatePresence>
          {index >= 0 &&
            questions.map((question, i) => (
              <TinderCard
                key={question.id}
                idx={i}
                image={question.image!}
                active={index === i}
                onSwiped={onSwiped}
              />
            ))}
          {index === -1 && (
            <motion.div
              key="end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <h2 className="flex w-full text-xl font-bold text-emerald-500">
                You scored: {score}/{fakeQuestions.length}
              </h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <main></main>
    </div>
  )
}

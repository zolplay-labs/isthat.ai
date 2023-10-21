import { desc, eq, inArray } from 'drizzle-orm'

import { db } from '~/db'
import { fetchQuestionCount } from '~/db/queries'
import { questions, questionsToTests, tests } from '~/db/schema'
import { env } from '~/env.mjs'
import dayjs from '~/lib/dayjs'
import { Random } from '~/lib/random'
import { shuffleArray } from '~/utils/shuffleArray'

const generateRandomSeed = ({ now }: { now: Date }) => {
  const nowDayjs = dayjs(now)
  const dateString = nowDayjs.format('YYYYMMDD')
  const idFlag = String(
    Math.floor(nowDayjs.hour() / env.NEXT_PUBLIC_REFRESH_INTERVAL_HOURS)
  ).padStart(2, '0')
  return dateString + idFlag
}

const generateRandomArray = ({
  length,
  max,
  seed,
}: {
  length: number
  max: number
  seed: string
}) => {
  const random = new Random(Number(seed))
  const randomArray: number[] = []
  const getRandomNumber = (): number => {
    const randomNumber = random.range(0, max)
    // Random array should be unrepeated when `length` is not bigger than `max`
    if (length <= max) {
      if (randomArray.includes(randomNumber)) {
        return getRandomNumber()
      }
    }
    return randomNumber
  }
  for (let index = 0; index < length; index++) {
    randomArray.push(getRandomNumber())
  }
  return randomArray
}

const generateRandomQuestions = async ({
  seed,
  testId,
}: {
  seed: string
  testId: number
}) => {
  // Generate random indexes
  const questionTotal = await fetchQuestionCount()
  if (questionTotal < env.NEXT_PUBLIC_QUESTIONS_PER_CHALLENGE) {
    throw new Error('Do not have enough questions')
  }
  const randomIndexes = generateRandomArray({
    length: env.NEXT_PUBLIC_QUESTIONS_PER_CHALLENGE,
    max: Math.min(env.NEXT_PUBLIC_ACTIVE_QUESTIONS_LIMIT, questionTotal),
    seed,
  })
  // Indexes -> Question IDs
  const activeQuestionsIds = (
    await db
      .select({ id: questions.id })
      .from(questions)
      .orderBy(desc(questions.id))
      .limit(env.NEXT_PUBLIC_ACTIVE_QUESTIONS_LIMIT - 1)
  ).map(({ id }) => id)
  const randomIds = randomIndexes.map(
    (index) => activeQuestionsIds[index] || -1
  )
  // Save IDs to test
  await db
    .insert(tests)
    .values({ id: testId })
    .onDuplicateKeyUpdate({ set: { id: testId } })
  await db.delete(questionsToTests).where(eq(questionsToTests.testId, testId))
  await db
    .insert(questionsToTests)
    .values(randomIds.map((questionId) => ({ questionId, testId })))
  // Get image from question IDs
  const images = (
    await db
      .select({ image: questions.image })
      .from(questions)
      .where(inArray(questions.id, randomIds))
  ).map(({ image }) => image)
  return images
}

const getQuestionFromTest = async ({ testId }: { testId: number }) => {
  const questionRows = await db
    .select()
    .from(questions)
    .innerJoin(questionsToTests, eq(questionsToTests.questionId, questions.id))
    .where(eq(questionsToTests.testId, testId))
  return questionRows.map(({ questions: { image } }) => image)
}

type GetQuestionsParams = {
  length: number
  now: Date
  testId: number
}
export const getQuestions = async ({
  length,
  now,
  testId,
}: GetQuestionsParams) => {
  const existedTestQuestions = await getQuestionFromTest({ testId })
  if (existedTestQuestions.length >= length) {
    return shuffleArray(existedTestQuestions).slice(0, length)
  }
  const generatedQuestions = await generateRandomQuestions({
    seed: generateRandomSeed({ now }),
    testId,
  })
  return shuffleArray(generatedQuestions).slice(0, length)
}

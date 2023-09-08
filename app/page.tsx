import { currentUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm'

import { db } from '~/db'
import { type Config, fetchConfig, fetchQuestionCount } from '~/db/queries'
import { questions } from '~/db/schema'
import { Random } from '~/lib/random'

import { Game } from './_game/Game'

const fetchUser = async () => {
  const clerkUser = await currentUser()
  const user =
    clerkUser !== null
      ? {
          name: clerkUser.firstName + ' ' + clerkUser.lastName,
          avatar: clerkUser.imageUrl,
        }
      : null
  return user
}

const generateRandomArray = (length: number, max: number) => {
  const seed = new Date().toISOString().slice(0, 10).replaceAll('-', '') // e.g. 20230830
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

const fetchRandomQuestions = async (config: Config, isTrial: boolean) => {
  const questionCount = await fetchQuestionCount()
  const randomIndexes = generateRandomArray(
    isTrial ? 1 : config.questionsPerChallenge,
    Math.min(config.activeQuestionsLimit, questionCount)
  )
  console.log(randomIndexes)
  const activeQuestionsIds = (
    await db
      .select({ id: questions.id })
      .from(questions)
      .orderBy(desc(questions.id))
      .limit(config.activeQuestionsLimit - 1)
  ).map(({ id }) => id)
  const randomIds = randomIndexes.map(
    (index) => activeQuestionsIds[index] || -1
  )
  const images = await Promise.all(
    randomIds.map(
      async (id) =>
        (
          await db
            .select({ image: questions.image })
            .from(questions)
            .where(eq(questions.id, id))
        )[0]?.image || ''
    )
  )
  return images
}

export default async function Home() {
  const config = await fetchConfig()
  const user = await fetchUser()
  const images = await fetchRandomQuestions(config, user === null)

  return <Game user={user} images={images} config={config} />
}

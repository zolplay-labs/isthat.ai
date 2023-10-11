import { currentUser } from '@clerk/nextjs'
import { desc, eq, inArray } from 'drizzle-orm'

import { db } from '~/db'
import { type Config, fetchConfig, fetchQuestionCount } from '~/db/queries'
import { questions, userScores } from '~/db/schema'
import { Random } from '~/lib/random'
import { checkToday } from '~/utils/date'

import { Game } from './_game/Game'
import { filterUser } from './_game/helpers/filterUser'

const fetchUser = async () => {
  const user = await currentUser()
  if (!user) return null
  return {
    ...filterUser(user),
    userId: user.id,
  }
}

const getRandomSeed = (config: Config) => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const refreshFlag = String(
    Math.floor(now.getHours() / config.refreshIntervalHours)
  ).padStart(2, '0')
  return `${year}${month}${day}${refreshFlag}`
}

const generateRandomArray = (length: number, max: number, seed: string) => {
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

const fetchRandomQuestions = async (
  config: Config,
  isTrial: boolean,
  seed: string
) => {
  const questionCount = await fetchQuestionCount()
  const randomIndexes = generateRandomArray(
    isTrial ? 1 : config.questionsPerChallenge,
    Math.min(config.activeQuestionsLimit, questionCount),
    seed
  )
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
  const images = (
    await db
      .select({ image: questions.image })
      .from(questions)
      .where(inArray(questions.id, randomIds))
  ).map(({ image }) => image)
  return images
}

const fetchUserScoreToday = async (userId: string) => {
  const [latestUserScoreRow] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.userId, userId))
    .orderBy(desc(userScores.createdAt))
    .limit(1)
  if (!latestUserScoreRow) return null
  const isScoreToday = checkToday(latestUserScoreRow.createdAt)
  if (!isScoreToday) return null
  return latestUserScoreRow
}

export default async function Home() {
  const config = await fetchConfig()
  const user = await fetchUser()
  const userScoreToday = user ? await fetchUserScoreToday(user.userId) : null
  const randomSeed = getRandomSeed(config)
  const images = userScoreToday
    ? []
    : await fetchRandomQuestions(config, user === null, randomSeed)

  return (
    <Game
      user={user}
      images={images}
      config={config}
      userScoreToday={userScoreToday}
    />
  )
}

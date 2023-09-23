import { clerkClient } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { ResultDisplay } from '~/app/_game/components/ResultDisplay'
import { calcDay } from '~/app/_game/helpers/calcDay'
import { filterUser } from '~/app/_game/helpers/filterUser'
import { db } from '~/db'
import { fetchConfig } from '~/db/queries'
import { userScores } from '~/db/schema'
import { sqids } from '~/lib/sqids'

export default async function Share({ params }: { params: { id: string } }) {
  const [id] = sqids.decode(params.id)
  if (!id) return notFound()
  const [userScore] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.id, id))
  if (!userScore) return notFound()

  const clerkUser = await clerkClient.users.getUser(userScore.userId)
  const user = filterUser(clerkUser)

  const config = await fetchConfig()
  const day = calcDay(config, userScore.createdAt)

  return (
    <div className="font-press-start-2p">
      <ResultDisplay
        userScore={userScore}
        day={day}
        user={user}
        date={userScore.createdAt}
      />
      <Link href="/" className="block w-fit border-2 border-white p-2 text-xl">
        Battle with AI
      </Link>
    </div>
  )
}

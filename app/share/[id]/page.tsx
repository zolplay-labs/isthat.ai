import { clerkClient } from '@clerk/nextjs'
import { clsxm } from '@zolplay/utils'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BorderWithoutCorner } from '~/app/_game/components/BorderWithoutCorner'
import { GameLayout } from '~/app/_game/components/GameLayout'
import { ResultDisplay } from '~/app/_game/components/ResultDisplay'
import { calcDay } from '~/app/_game/helpers/calcDay'
import { filterUser } from '~/app/_game/helpers/filterUser'
import { db } from '~/db'
import { fetchConfig } from '~/db/queries'
import { userScores } from '~/db/schema'
import { sqids } from '~/lib/sqids'

function BattleButton({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={clsxm(
        'relative w-fit cursor-pointer p-[6px] text-[14px] sm:text-[12px]',
        className
      )}
    >
      <BorderWithoutCorner width={4} />
      Battle with AI
    </Link>
  )
}

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
      <GameLayout
        header={<span>~ Result ~</span>}
        headerRight={<BattleButton className="hidden sm:block" />}
        className="flex h-full w-full flex-col items-center justify-center gap-[35px] px-[10px] sm:px-[30px]"
      >
        <ResultDisplay
          userScore={userScore}
          day={day}
          user={user}
          date={userScore.createdAt}
        />
        <BattleButton className="block sm:hidden" />
      </GameLayout>
    </div>
  )
}

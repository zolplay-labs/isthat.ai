import { clerkClient } from '@clerk/nextjs'
import { clsxm } from '@zolplay/utils'
import { eq } from 'drizzle-orm'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { GameLayout } from '~/app/_game/components/GameLayout'
import { ResultDisplay } from '~/app/_game/components/ResultDisplay'
import { calcDay } from '~/app/_game/helpers/calcDay'
import { filterUser } from '~/app/_game/helpers/filterUser'
import { db } from '~/db'
import { fetchConfig } from '~/db/queries'
import { userScores } from '~/db/schema'
import { sqids } from '~/lib/sqids'

function BattleButton({
  backgroundColor,
  className,
}: {
  backgroundColor: string
  className?: string
}) {
  return (
    <Link
      href="/"
      className={clsxm(
        'relative w-fit cursor-pointer border-[4px] border-white p-[6px] text-[14px] sm:text-[12px]',
        className
      )}
    >
      <div
        className="absolute left-[-4px] top-[-4px] h-[4px] w-[4px]"
        style={{ backgroundColor }}
      />
      <div
        className="absolute right-[-4px] top-[-4px] h-[4px] w-[4px]"
        style={{ backgroundColor }}
      />
      <div
        className="absolute bottom-[-4px] left-[-4px] h-[4px] w-[4px]"
        style={{ backgroundColor }}
      />
      <div
        className="absolute bottom-[-4px] right-[-4px] h-[4px] w-[4px]"
        style={{ backgroundColor }}
      />
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
        headerRight={
          <BattleButton backgroundColor="#5A5A5A" className="hidden sm:block" />
        }
        className="flex h-full w-full flex-col items-center justify-center gap-[35px] px-[10px] sm:px-[30px]"
      >
        <ResultDisplay
          userScore={userScore}
          day={day}
          user={user}
          date={userScore.createdAt}
        />
        <BattleButton backgroundColor="black" className="block sm:hidden" />
      </GameLayout>
    </div>
  )
}

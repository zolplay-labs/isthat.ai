import { clerkClient } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/server'

import { filterUser } from '~/app/_game/helpers/filterUser'
import { getResultTier } from '~/app/_game/helpers/getResultTier'
import { getTestId } from '~/app/_game/helpers/getTestId'
import { db } from '~/db'
import { userScores } from '~/db/schema'
import { env } from '~/env.mjs'
import { sqids } from '~/lib/sqids'

export const size = { width: 1200, height: 675 }

export default async function Image({ params }: { params: { id: string } }) {
  const [id] = sqids.decode(params.id)

  if (!id) return notFound()

  const [userScore] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.id, id))

  if (!userScore) return notFound()

  const clerkUser = await clerkClient.users.getUser(userScore.userId)
  const user = filterUser(clerkUser)

  const testId = getTestId({ date: userScore.createdAt })

  const tier = getResultTier(userScore.score, userScore.total, userScore.time)

  const fontData = await fetch(
    new URL(`${env.HOSTNAME}/fonts/PressStart2P.ttf`, import.meta.url)
  ).then((res) => res.arrayBuffer())

  const defaultAvatar = await fetch(
    `${env.HOSTNAME}/images/default-avatar.png`
  ).then((res) => res.arrayBuffer())

  const fetchAvatar = await fetch(user.avatar).then((res) =>
    res.status === 200 ? res.arrayBuffer() : defaultAvatar
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          color: '#fff',
        }}
      >
        <img
          tw="absolute"
          src={`${env.HOSTNAME}/images/social/bg.png`}
          alt="og-bg"
        />
        <img
          src={env.HOSTNAME + tier.image}
          alt="og-result"
          width={539}
          height={539}
        />
        <div tw="flex w-[525px] h-[539px] flex-col justify-between pt-[44px] pb-[46px]">
          <div tw="flex items-center justify-center" style={{ gap: 16 }}>
            <div tw="flex w-9 h-9 text-sm border-2 border-white relative">
              {/* @ts-expect-error Lack of typing from ImageResponse */}
              <img src={fetchAvatar} alt="og-bg" width={32} height={32} />
              <div tw="w-0.5 h-0.5 bg-[#090909] absolute -left-0.5 -top-0.5" />
              <div tw="w-0.5 h-0.5 bg-[#090909] absolute -left-0.5 -bottom-0.5" />
              <div tw="w-0.5 h-0.5 bg-[#090909] absolute -right-0.5 -top-0.5" />
              <div tw="w-0.5 h-0.5 bg-[#090909] absolute -right-0.5 -bottom-0.5" />
            </div>
            <div
              tw="text-[28px] pt-4 overflow-hidden"
              style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
            >
              {user.name}
            </div>
          </div>
          <div tw="text-[44px] leading-[64px] text-center flex justify-center">
            {tier.title}
          </div>
          <div tw="flex flex-col" style={{ gap: 4 }}>
            <div tw="flex justify-center text-[24px]" style={{ gap: 26 }}>
              <div>~</div>
              <div>Test</div>
              <div tw="flex">
                <div>#</div>
                <div>{String(testId)}</div>
              </div>
              <div>~</div>
            </div>
            <div tw="flex justify-center text-[20px] text-[#FFFFFFB2]">
              isthat.ai
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Press Start 2P',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}

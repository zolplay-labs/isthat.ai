import { clerkClient } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/server'

import { filterUser } from '~/app/_game/helpers/filterUser'
import { getResultTier } from '~/app/_game/helpers/getResultTier'
import { db } from '~/db'
import { userScores } from '~/db/schema'
import { env } from '~/env.mjs'
import { sqids } from '~/lib/sqids'
import { formatDate } from '~/utils/date'

export const alt = 'isthat.ai'
export const size = { width: 1200, height: 675 }
export const contentType = 'image/png'

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

  const tier = getResultTier(userScore.score, userScore.total, userScore.time)

  const hostname = env.PAGE_HOST

  const [fontData] = await Promise.all([
    fetch(new URL(`${hostname}/fonts/PressStart2P.ttf`, import.meta.url)).then(
      (res) => res.arrayBuffer()
    ),
  ])

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
          src={`${hostname}/images/social/bg.png`}
          alt="og-bg"
          style={{ position: 'absolute' }}
        />
        <img
          src={hostname + tier.image}
          alt="og-result"
          width={539}
          height={539}
        />
        <div
          style={{
            width: 525,
            height: 539,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 44,
            paddingBottom: 46,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                fontSize: 14,
                borderWidth: 2,
                borderColor: '#fff',
                position: 'relative',
                display: 'flex',
              }}
            >
              <img src={hostname + '/images/default-avatar.png'} alt="og-bg" />
              <div
                style={{
                  width: 2,
                  height: 2,
                  background: '#090909',
                  position: 'absolute',
                  left: -2,
                  top: -2,
                }}
              />
              <div
                style={{
                  width: 2,
                  height: 2,
                  background: '#090909',
                  position: 'absolute',
                  left: -2,
                  bottom: -2,
                }}
              />
              <div
                style={{
                  width: 2,
                  height: 2,
                  background: '#090909',
                  position: 'absolute',
                  right: -2,
                  top: -2,
                }}
              />
              <div
                style={{
                  width: 2,
                  height: 2,
                  background: '#090909',
                  position: 'absolute',
                  right: -2,
                  bottom: -2,
                }}
              />
            </div>
            <div
              style={{
                fontSize: 28,
                paddingTop: 16,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {user.name}
            </div>
          </div>
          <div
            style={{ fontSize: 44, textAlign: 'center', lineHeight: '64px' }}
          >
            {tier.title}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                fontSize: 24,
                gap: 36,
              }}
            >
              <div>~</div>
              <div>{formatDate(userScore.createdAt)}</div>
              <div>~</div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: '#FFFFFFB2',
                fontSize: 20,
              }}
            >
              @isthat.ai
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}

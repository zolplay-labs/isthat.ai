import { clerkClient } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/server'

import { filterUser } from '~/app/_game/helpers/filterUser'
import { db } from '~/db'
import { userScores } from '~/db/schema'
import { sqids } from '~/lib/sqids'
import { formatLocaleDate } from '~/utils/date'

export const alt = 'isthat.ai'
export const size = { width: 1200, height: 675 }
export const contentType = 'image/png'

export const runtime = 'edge'

const obj = {
  a: fetch(
    new URL('./../../../public/images/social/bg.png', import.meta.url)
  ).then((res) => res.arrayBuffer()),
  b: fetch(
    new URL('./../../../public/images/social/result.png', import.meta.url)
  ).then((res) => res.arrayBuffer()),
}

export default async function Image({ params }: { params: { id: string } }) {
  const [id] = sqids.decode(params.id)

  if (!id) return notFound()

  const [userScore] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.id, 48))

  if (!userScore) return notFound()

  const clerkUser = await clerkClient.users.getUser(userScore.userId)
  const user = filterUser(clerkUser)

  const [fontData, ogBackground, ogResult, ogAvatar] = await Promise.all([
    fetch(
      new URL('./../../../public/fonts/PressStart2P.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer()),
    fetch(
      new URL('./../../../public/images/social/bg.png', import.meta.url)
    ).then((res) => res.arrayBuffer()),
    obj.b,
    fetch(
      new URL('./../../../public/images/default-avatar.png', import.meta.url)
    ).then((res) => res.arrayBuffer()),
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
          color: '#fff',
          position: 'relative',
        }}
      >
        {/* @ts-expect-error Lack of typing from ImageResponse */}
        <img src={ogBackground} alt="og-bg" style={{ position: 'absolute' }} />
        {/* @ts-expect-error Lack of typing from ImageResponse */}
        <img src={ogResult} alt="og-result" width={539} height={539} />
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
              {/* @ts-expect-error Lack of typing from ImageResponse */}
              <img src={ogAvatar} alt="og-bg" />
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
            Algorithm Apprentice
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
              <div>{formatLocaleDate(userScore.createdAt)}</div>
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
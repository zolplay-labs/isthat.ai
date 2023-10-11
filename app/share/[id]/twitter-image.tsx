import { clerkClient } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/server'

import { filterUser } from '~/app/_game/helpers/filterUser'
import { db } from '~/db'
import { userScores } from '~/db/schema'
import { sqids } from '~/lib/sqids'
import { formatLocaleDate } from '~/utils/date'

// Image metadata
export const alt = 'isthat.ai'
export const size = { width: 1200, height: 675 }
export const contentType = 'image/png'

// Image generation
export default async function Image({
  params,
}: {
  params: { id: string; name: string }
}) {
  const [id] = sqids.decode(params.id)

  if (!id) return notFound()

  const [userScore] = await db
    .select()
    .from(userScores)
    .where(eq(userScores.id, id))

  if (!userScore) return notFound()

  const clerkUser = await clerkClient.users.getUser(userScore.userId)
  const user = filterUser(clerkUser)

  const fontData = await fetch(
    'http://localhost:3000/fonts/PressStart2P.ttf'
  ).then((res) => res.arrayBuffer())

  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url("http://localhost:3000/images/social/bg.png")`,
          color: '#fff',
        }}
      >
        <div
          style={{
            width: 539,
            height: 539,
            backgroundImage:
              'url("http://localhost:3000/images/social/result.png")',
            backgroundSize: '539px 539px',
          }}
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
                backgroundImage:
                  'url("http://localhost:3000/images/default-avatar.png")',
                backgroundSize: '100% 100%',
                position: 'relative',
                display: 'flex',
              }}
            >
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

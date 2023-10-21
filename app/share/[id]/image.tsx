import { clerkClient } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/server'

import { filterUser } from '~/app/_game/helpers/filterUser'
import { getResultById } from '~/app/_game/helpers/getResultById'
import { getResultTier } from '~/app/_game/helpers/getResultTier'
import { getTestId } from '~/app/_game/helpers/getTestId'
import { env } from '~/env.mjs'

export const alt = 'isthat.ai'
export const contentType = 'image/png'
export const size = { width: 1200, height: 675 }

export default async function Image({ params }: { params: { id: string } }) {
  let result
  try {
    result = await getResultById(params.id)
  } catch (error) {
    console.error(error)
    return notFound()
  }

  const clerkUser = await clerkClient.users.getUser(result.score.userId)
  const user = filterUser(clerkUser)

  const testId = getTestId({ date: result.score.createdAt })

  const tier = getResultTier({
    score: result.score.score,
    total: result.score.total,
    time: result.score.time,
  })

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
        <div
          tw="flex w-[539px] h-[539px] relative"
          style={{
            backgroundImage: `url(${env.HOSTNAME}${tier.image})`,
            backgroundSize: '100% 100%',
          }}
        >
          <div tw="absolute w-[5px] h-[3px] bg-[#1e1e1e]" />
          <div tw="absolute w-[5px] h-[3px] bg-[#1e1e1e] bottom-0" />
        </div>
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

import { clerkClient } from '@clerk/nextjs'
import { notFound } from 'next/navigation'
import { ImageResponse } from 'next/server'

import { filterUser } from '~/app/_game/helpers/filterUser'
import { getResultById } from '~/app/_game/helpers/getResultById'
import { getResultTier } from '~/app/_game/helpers/getResultTier'
import { getTestId } from '~/app/_game/helpers/getTestId'
import { url } from '~/lib/url'

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
    new URL(url(`/fonts/PressStart2P.ttf`), import.meta.url)
  ).then((res) => res.arrayBuffer())

  const defaultAvatar = await fetch(url(`/images/default-avatar.png`)).then(
    (res) => res.arrayBuffer()
  )

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
          src={url(`/images/social/bg.png`).toString()}
          alt="og-bg"
        />
        <div
          tw="flex w-[539px] h-[539px] relative"
          style={{
            backgroundImage: `url(${url(tier.image)})`,
            backgroundSize: '100% 100%',
          }}
        >
          <div tw="absolute w-[5px] h-[3px] bg-[#1e1e1e]" />
          <div tw="absolute w-[5px] h-[3px] bg-[#1e1e1e] bottom-0" />
          <div
            tw="absolute w-[10px] h-[13px] bg-white left-[5px]"
            style={{
              borderLeft: '1px solid #727272',
              borderRight: '1px solid #a3a3a3',
              borderBottom: '1px solid #474747',
            }}
          />
          <div
            tw="absolute w-[6px] h-[10px] bg-white top-[3px]"
            style={{
              borderTop: '1px solid #c7c7c7',
              borderBottom: '1px solid #474747',
            }}
          />
          <div
            tw="absolute w-[10px] h-[13px] bg-white left-[5px] bottom-0"
            style={{
              borderTop: '1px solid #474747',
              borderLeft: '1px solid #727272',
              borderRight: '1px solid #a3a3a3',
            }}
          />
          <div
            tw="absolute w-[6px] h-[10px] bg-white bottom-[3px]"
            style={{
              borderTop: '1px solid #474747',
              borderBottom: '1px solid #c7c7c7',
            }}
          />
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

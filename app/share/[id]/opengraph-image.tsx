import { ImageResponse } from 'next/server'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'About Acme'
export const size = {
  width: 1200,
  height: 675,
}

export const contentType = 'image/png'

// Image generation
export default async function Image({ params }: { params: { id: string } }) {
  const { id } = params
  console.log(id, 'id')

  // Font
  const interSemiBold = fetch(
    new URL('./PressStart2P-Regular.ttf', import.meta.url)
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
          backgroundImage: 'url("http://localhost:3000/bg.png")',
          color: '#fff',
        }}
      >
        <div
          style={{
            width: 539,
            height: 539,
            backgroundImage: 'url("http://localhost:3000/test.png")',
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
              // marginTop: 44,
              paddingLeft: 69.5,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                fontSize: 14,
                backgroundImage: 'url("http://localhost:3000/avatar.png")',
                backgroundSize: '100% 100%',
                borderWidth: 2,
                borderColor: '#fff',
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
            <div style={{ fontSize: 28, paddingTop: 16 }}>Jimmy bulter</div>
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
                gap: 50,
              }}
            >
              <div>~</div>
              <div>Oct 5, 2023</div>
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
          data: await interSemiBold,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}

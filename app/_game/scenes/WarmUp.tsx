import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState } from 'react'

import { useScene } from '~/stores/Scene.store'

import { GameLayout } from '../components/GameLayout'

function Header() {
  return (
    <span>
      <span>Is this image generated by </span>
      <span className="bg-[linear-gradient(180deg,#E3FFB5_0%,#9E95FF_60.09%,#0E7FA3_100%,#712E91_100%,#D57DFF_100%)] bg-clip-text text-transparent">
        AI
      </span>
      <span> ?</span>
    </span>
  )
}

function Handler({
  step,
  onClick,
}: {
  step: number
  onClick: (step: number) => void
}) {
  return (
    <div className="absolute bottom-0 left-0 flex w-full justify-between">
      {step > 0 ? (
        <Image
          className="h-8 w-8 cursor-click sm:h-16 sm:w-16"
          src="/images/ftue/prev.svg"
          alt="prev"
          width={64}
          height={64}
          onClick={() => onClick(step - 1)}
        />
      ) : (
        <div className="w-8 sm:w-16" />
      )}
      <div className="flex items-center">
        <Image
          className="h-3 sm:h-6"
          src={`/images/ftue/index-${step + 1}.svg`}
          alt="prev"
          width={104}
          height={24}
        />
      </div>
      <Image
        className="h-8 w-8 cursor-click sm:h-16 sm:w-16"
        src={`/images/ftue/${step === 2 ? 'check' : 'next'}.svg`}
        alt="prev"
        width={64}
        height={64}
        onClick={() => onClick(step + 1)}
      />
    </div>
  )
}

const tips = [
  'Each test has 10 pictures, some of which are generated by AI, while others are not. You need to use your discerning eye to judge',
  'Press and drag the image to determine if it was generated by AI',
  'When all the images have been evaluated, the results are determined based on accuracy and spending time.',
]

const images = [
  <div
    key={0}
    className="relative aspect-[235/205] h-[calc(205/341*100%)] min-h-[205px]"
  >
    <Image src="/images/ftue/step-1.svg" alt="step-1" fill />
  </div>,
  <div
    key={1}
    className="relative h-full w-full bg-[rgba(204,251,241,0.4)] sm:bg-transparent"
  >
    <div className="hidden h-full justify-center sm:flex">
      <div className="relative aspect-[385/353] h-full max-w-[50%]">
        <div className="absolute left-10 top-[calc(150/353*100%)] aspect-[120/102] h-[calc(102/353*100%)]">
          <Image src="/images/ftue/not-ai.svg" alt="not-ai" fill />
        </div>
      </div>
      <div className="relative aspect-[385/353] h-full max-w-[50%] bg-[rgba(204,251,241,0.4)]">
        <div className="absolute right-10 top-[calc(148/353*100%)] aspect-[64/103] h-[calc(103/353*100%)]">
          <Image src="/images/ftue/is-ai.svg" alt="is-ai" fill />
        </div>
        <div className="absolute right-[calc(148/385*100%)] top-[calc(75/353*100%)] aspect-[1052/752] h-[calc(248.33/353*100%)]">
          <Image src="/images/ftue/step-2.png" alt="step-2" fill />
        </div>
      </div>
    </div>
    <Image
      src="/images/ftue/m-not-ai.svg"
      className="absolute bottom-[11px] block sm:hidden"
      alt="not-ai"
      width={72}
      height={56}
    />
    <Image
      src="/images/ftue/m-is-ai.svg"
      className="absolute bottom-[11px] right-0 block sm:hidden"
      alt="is-ai"
      width={32}
      height={56}
    />
    <Image
      src="/images/ftue/m-step-2.png"
      className="absolute right-0 top-[calc(80.5/324*100%)] block w-[calc(201/257*100%)] sm:hidden"
      alt="m-step-2"
      width={201}
      height={141}
    />
  </div>,
  <div
    key={2}
    className="relative aspect-[480/526] h-[calc(263/312*100%)] max-w-full sm:aspect-[1462/480] sm:h-[calc(240/341*100%)]"
  >
    <Image
      className="block sm:hidden"
      src="/images/ftue/m-step-3.png"
      alt="step-3"
      fill
      style={{ objectFit: 'contain' }}
    />
    <Image
      className="hidden sm:block"
      src="/images/ftue/step-3.png"
      alt="step-3"
      fill
      style={{ objectFit: 'contain' }}
    />
  </div>,
]

function Step({ handler, step }: { handler: React.ReactNode; step: number }) {
  return (
    <div className="flex h-full flex-col">
      {step !== 1 && <div className="h-[calc(18/612*100%)]" />}
      <div className="flex flex-1 items-center justify-center px-[11px] sm:px-0">
        {images[step]}
      </div>
      <div className="flex h-[calc(198/523*100%)] flex-col pl-[11px] pr-[11px] sm:h-[calc(256/612*100%)] sm:pl-[38px] sm:pr-9">
        <div className="relative flex flex-1 flex-col overflow-hidden border-t-[3px] border-white text-center text-[11px] leading-[15px] sm:text-xl">
          <div className="hidden h-[calc(32/216*100%)] sm:block" />
          <div className="flex flex-1 items-center justify-center sm:flex-initial">
            {tips[step]}
          </div>
          <div className="block h-8 sm:hidden"></div>
          {handler}
        </div>
        <div className="h-[calc(28/198*100%)] sm:h-[calc(37/256*100%)]" />
      </div>
    </div>
  )
}

export function WarmUp() {
  const { switchScene } = useScene()
  const [step, setStep] = useState(0)

  const skipWarmUp = () => {
    localStorage.setItem('hasWarmedUp', 'true')
    switchScene('READY')
  }

  const onChangeStep = (index: number) => {
    if (index === 3) return skipWarmUp()

    setStep(index)
  }

  return (
    <GameLayout
      header={<Header />}
      className="relative h-full w-full overflow-x-hidden"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-full cursor-normal select-none font-press-start-2p"
        >
          <Step
            step={step}
            handler={<Handler step={step} onClick={onChangeStep} />}
          />
        </motion.div>
      </AnimatePresence>
    </GameLayout>
  )
}

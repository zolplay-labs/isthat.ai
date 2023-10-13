import Image from 'next/image'

export const PIXELATED_RESULT_TIER_IMAGES = [
  '/images/result-tiers/pixel/ai-detective.png',
  '/images/result-tiers/pixel/ai-spy.png',
  '/images/result-tiers/pixel/algorithm-apprentice.png',
  '/images/result-tiers/pixel/blundering-botanist.png',
  '/images/result-tiers/pixel/clueless-coder.png',
  '/images/result-tiers/pixel/code-curator.png',
  '/images/result-tiers/pixel/digital-diplomat.png',
  '/images/result-tiers/pixel/pixel-pro.png',
  '/images/result-tiers/pixel/techie-trainee.png',
]

export function PreloadResultWaitingImages() {
  return (
    <div className="hidden">
      {PIXELATED_RESULT_TIER_IMAGES.map((image, i) => (
        <Image
          src={image}
          alt="grade"
          className="h-[248px] w-[248px] object-contain sm:h-full sm:w-full"
          width={248}
          height={248}
          key={i}
          priority
        />
      ))}
    </div>
  )
}

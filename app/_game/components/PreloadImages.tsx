import Image from 'next/image'

export function PreloadImages({ images }: { images: string[] }) {
  return (
    <div className="hidden">
      {images.map((image, i) => (
        <Image
          src={image}
          alt={`preload ${i}`}
          width={1024}
          height={1024}
          key={i}
          priority
        />
      ))}
    </div>
  )
}

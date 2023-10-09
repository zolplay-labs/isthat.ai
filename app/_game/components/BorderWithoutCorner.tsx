interface BorderWithoutCornerProps {
  width: number
}

export function BorderWithoutCorner({ width }: BorderWithoutCornerProps) {
  return (
    <>
      <div
        style={{ height: width + 'px', top: `-${width}px` }}
        className="absolute left-0 w-full bg-white"
      />
      <div
        style={{ height: width + 'px', bottom: `-${width}px` }}
        className="absolute left-0 w-full bg-white"
      />
      <div
        style={{ width: width + 'px', left: `-${width}px` }}
        className="absolute top-0 h-full bg-white"
      />
      <div
        style={{ width: width + 'px', right: `-${width}px` }}
        className="absolute top-0 h-full bg-white"
      />
    </>
  )
}

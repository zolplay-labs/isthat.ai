export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffledArray = [...array]
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[shuffledArray[i], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex]!,
      shuffledArray[i]!,
    ]
  }
  return shuffledArray
}

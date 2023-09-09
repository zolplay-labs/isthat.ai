export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const minutesString = String(minutes).padStart(2, '0')
  const secondsString = String(remainingSeconds).padStart(2, '0')

  return `${minutesString}:${secondsString}`
}

export const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}.${month}.${day}`
}

export const checkToday = (date: Date) => {
  const today = new Date()
  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  return isToday
}

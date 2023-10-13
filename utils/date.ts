export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  const minutesString = String(minutes).padStart(2, '0')
  const secondsString = String(remainingSeconds).padStart(2, '0')

  return `${minutesString}:${secondsString}`
}

export const formatDate = (date: Date) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const month = months[date.getMonth()]
  const day = date.getDate()
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

export const formatLocaleDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = String(date.getDate()).padStart(2, '0')

  const monthMap: { [key: number]: string } = {
    0: 'Jan',
    1: 'Feb',
    2: 'Mar',
    3: 'Apr',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'Aug',
    8: 'Sept',
    9: 'Oct',
    10: 'Nov',
    11: 'Dec',
  }

  const localeMonth = monthMap[month]

  return `${localeMonth} ${day}, ${year}`
}

export const checkToday = (date: Date) => {
  const today = new Date()
  const isToday =
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  return isToday
}

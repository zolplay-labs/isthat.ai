import { type User as ClerkUser } from '@clerk/nextjs/dist/types/server'

import { type User } from '~/stores/User.store'

export const filterUser = (clerkUser: ClerkUser) => {
  let name = ''
  if (clerkUser.firstName !== null && clerkUser.lastName !== null) {
    name = clerkUser.firstName + ' ' + clerkUser.lastName
  } else if (clerkUser.firstName !== null) {
    name = clerkUser.firstName
  } else if (clerkUser.lastName !== null) {
    name = clerkUser.lastName
  }
  const user: User = {
    name,
    avatar: clerkUser.hasImage
      ? clerkUser.imageUrl
      : '/images/default-avatar.png',
  }
  return user
}

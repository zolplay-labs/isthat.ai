import { type User as ClerkUser } from '@clerk/nextjs/dist/types/server'

import { type User } from '~/stores/User.store'

export const filterUser = (clerkUser: ClerkUser) => {
  const user: User = {
    name: clerkUser.firstName + ' ' + clerkUser.lastName,
    avatar: clerkUser.imageUrl,
  }
  return user
}

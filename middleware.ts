import { authMiddleware, clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export default authMiddleware({
  async afterAuth(auth, req) {
    if (req.nextUrl.pathname === '/admin') {
      if (!auth.userId) {
        return NextResponse.rewrite(new URL('/admin/unauthorized', req.url))
      }
      const user = await clerkClient.users.getUser(auth.userId)
      if (!user.publicMetadata?.isAdmin) {
        return NextResponse.rewrite(new URL('/admin/unauthorized', req.url))
      }
    }
  },
})

export const config = {
  matcher: ['/((?!.*\\..*|_next|share).*)', '/', '/(api|trpc)(.*)'],
}

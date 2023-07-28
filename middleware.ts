import { authMiddleware, clerkClient, redirectToSignIn } from '@clerk/nextjs'

export default authMiddleware({
  async afterAuth(auth, req) {
    if (req.nextUrl.pathname === '/admin') {
      if (!auth.userId) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return redirectToSignIn({ returnBackUrl: req.url })
      }
      const user = await clerkClient.users.getUser(auth.userId)
      if (!user.publicMetadata?.isAdmin) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return redirectToSignIn({ returnBackUrl: req.url })
      }
    }
  },
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}

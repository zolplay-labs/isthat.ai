import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'

export const challengesRouter = createTRPCRouter({
  latest: protectedProcedure.query(({ ctx }) => {
    const { auth, prisma } = ctx

    return {
      data: `Hello ${auth.userId}`,
    }
  }),
})

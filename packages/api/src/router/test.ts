import { protectedProcedure, publicProcedure, router } from '../trpc'

export const testRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.user
  }),
  getSecretMessage: publicProcedure.query(() => {
    return 'you can see this not so secret message!'
  }),
})

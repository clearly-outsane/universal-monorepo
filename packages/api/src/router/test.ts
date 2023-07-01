import { protectedProcedure, publicProcedure, router } from '../trpc'
import z from 'zod'

export const testRouter = router({
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.user
  }),
  getSecretMessage: protectedProcedure.input(z.any()).query(({ ctx }) => {
    console.log('getSecretMessage', ctx.user.firstName)
    return 'you can see this secret message!'
  }),
})

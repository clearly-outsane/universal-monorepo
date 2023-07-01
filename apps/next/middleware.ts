import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware({ publicRoutes: ['/'] })

//exclude static files n such from being processed by Clerk. Include trpc
export const config = {
  matcher: ['/((?!.*\\..*|_next|static|favicon.ico).*)', '/', '/(api|trpc)(.*)'],
}

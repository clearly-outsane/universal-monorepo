import { authMiddleware } from '@clerk/nextjs'

export default authMiddleware()

//exclude static files n such from being processed by Clerk. Include trpc
export const config = {
  matcher: ['/((?!.*\\..*|_next|static|favicon.ico).*)', '/', '/(api|trpc)(.*)'],
}

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/auth(.*)',
  '/api(.*)',
  '/features(.*)',
  '/_next(.*)',
  '/favicon.ico',
])

export default clerkMiddleware(
  async (auth, req) => {
    if (isPublicRoute(req)) {
      return
    }

    await auth.protect()
  },
  {
    signInUrl: '/auth/log-in',
    signUpUrl: '/auth/sign-up',
  },
)

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
  ],
}

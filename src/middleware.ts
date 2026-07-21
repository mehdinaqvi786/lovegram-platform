import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/',
  '/auth(.*)',
  '/api/public(.*)',
])

export default clerkMiddleware(
  async (auth, req) => {
    // Allow public routes
    if (isPublicRoute(req)) {
      return
    }

    // Protect all other routes
    await auth.protect()
  },
  {
    signInUrl: '/auth/log-in',
    signUpUrl: '/auth/sign-up',
  },
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

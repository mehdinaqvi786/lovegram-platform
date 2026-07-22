import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

const PUBLIC_PATHS = [
  '/auth',
  '/auth/log-in',
  '/auth/sign-up',
  '/features',
  '/_next',
  '/favicon.ico',
  '/',
]

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((path) => pathname === path || pathname.startsWith(path))
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/auth/log-in', request.url))
  }

  try {
    verifyToken(token)
    return NextResponse.next()
  } catch {
    return NextResponse.redirect(new URL('/auth/log-in', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
}

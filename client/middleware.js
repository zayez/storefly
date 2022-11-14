import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export function middleware(request) {
  const cookie = request.cookies.get('token')

  if (!cookie) return NextResponse.redirect(new URL('/signin', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const token = request.cookies.get('payload-token')?.value
  const { pathname } = request.nextUrl

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register')

  if (isAuthRoute) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  } else {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login', '/register', '/admin/:path*'],
}

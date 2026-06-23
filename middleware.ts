import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const authed = request.cookies.has('nd-authed')
  if (!authed) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/profile'],
}

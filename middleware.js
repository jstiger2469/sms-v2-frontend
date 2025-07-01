import { NextResponse } from 'next/server'

export default async function middleware(req) {
  // For SPAs, we'll let the client-side handle authentication
  // The middleware will just pass through and let the React components handle auth
  
  // Check if the request is for a protected route
  const protectedPaths = [
    '/dashboard',
    '/matches',
    '/messages', 
    '/users',
    '/send-message'
  ]
  
  const isProtectedPath = protectedPaths.some(path => 
    req.nextUrl.pathname.startsWith(path)
  )
  
  if (isProtectedPath) {
    // For SPA, we'll let the client-side components handle authentication
    // They can redirect to login if needed
    return NextResponse.next()
  }
  
  // Not a protected path, continue
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/matches/:path*',
    '/messages/:path*',
    '/users/:path*',
    '/send-message/:path*'
  ],
} 
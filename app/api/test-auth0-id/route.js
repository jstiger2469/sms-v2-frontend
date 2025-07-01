import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0'

export async function GET() {
  try {
    const session = await getSession()
    if (session?.user) {
      return NextResponse.json({
        auth0Id: session.user.sub,
        user: session.user,
        message: 'Current Auth0 user info'
      })
    }
    return NextResponse.json({
      auth0Id: null,
      user: null,
      message: 'No user session found'
    })
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json({
      auth0Id: null,
      user: null,
      error: error.message
    })
  }
} 
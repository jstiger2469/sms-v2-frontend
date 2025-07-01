import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0'

export async function GET(request) {
  try {
    const session = await getSession(request)
    if (session?.user) {
      return NextResponse.json(session.user)
    }
    return NextResponse.json(null)
  } catch (error) {
    console.error('Auth error:', error)
    return NextResponse.json(null)
  }
} 
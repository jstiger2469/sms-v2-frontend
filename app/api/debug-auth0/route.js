import { NextResponse } from 'next/server'

export async function GET() {
  const secret = process.env.AUTH0_SECRET
  return NextResponse.json({
    secretLength: secret ? secret.length : 0,
    secretStartsWith: secret ? secret.substring(0, 10) + '...' : 'undefined',
    allEnvVars: {
      AUTH0_SECRET: secret ? 'SET' : 'NOT SET',
      AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
      AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
      AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID ? 'SET' : 'NOT SET',
      AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET ? 'SET' : 'NOT SET',
    }
  })
} 
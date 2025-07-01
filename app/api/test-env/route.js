import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    AUTH0_SECRET: process.env.AUTH0_SECRET ? 'SET' : 'NOT SET',
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID ? 'SET' : 'NOT SET',
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET ? 'SET' : 'NOT SET',
    MONGODB_URL: process.env.MONGODB_URL ? 'SET' : 'NOT SET',
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID ? 'SET' : 'NOT SET',
  })
} 
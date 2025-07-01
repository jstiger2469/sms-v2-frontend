import { NextResponse } from 'next/server'

export async function GET() {
  const config = {
    AUTH0_BASE_URL: process.env.AUTH0_BASE_URL,
    AUTH0_ISSUER_BASE_URL: process.env.AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID ? 'SET' : 'NOT_SET',
    AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET ? 'SET' : 'NOT_SET',
    AUTH0_SECRET: process.env.AUTH0_SECRET ? 'SET' : 'NOT_SET',
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_SCOPE: process.env.AUTH0_SCOPE,
  }
  
  return NextResponse.json(config)
} 
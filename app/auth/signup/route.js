import { NextResponse } from 'next/server'

export const GET = async (request) => {
  // Redirect directly to Auth0 signup URL
  const auth0Domain = process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '') || 'mentorsms.us.auth0.com'
  const clientId = process.env.AUTH0_CLIENT_ID || 'WMkzmvIpLDOVEFc2C6sheMAMwUSWJHnj'
  const redirectUri = encodeURIComponent(`${process.env.AUTH0_BASE_URL || 'https://gomentor.tech'}/auth/callback`)
  
  const signupUrl = `https://${auth0Domain}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid%20profile%20email&screen_hint=signup`
  
  return NextResponse.redirect(signupUrl)
} 
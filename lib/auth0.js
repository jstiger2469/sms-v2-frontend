// This file is not needed for Auth0Provider in v4.6.1. Use direct imports in your components.
// You can delete this file if not used elsewhere.

import { initAuth0 } from '@auth0/nextjs-auth0'

const auth0Config = {
  baseURL: process.env.AUTH0_BASE_URL,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  authorizationParams: {
    scope: 'openid profile email'
  },
  session: {
    absoluteDuration: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
    rolling: true
  },
  routes: {
    callback: '/auth/callback',
    postLogoutRedirect: '/'
  },
  // Add logout configuration
  logout: {
    returnTo: process.env.AUTH0_BASE_URL
  },
  // Add cookie configuration
  cookies: {
    sessionToken: {
      name: `appSession`,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    },
    state: {
      name: `appState`,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    },
    nonce: {
      name: `appNonce`,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    }
  }
}

export const auth0 = initAuth0(auth0Config)
export { auth0Config } 
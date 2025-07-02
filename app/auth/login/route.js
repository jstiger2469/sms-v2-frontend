import { handleLogin } from '@auth0/nextjs-auth0'

export const GET = async (request) => {
  // Check if this is a signup request
  const { searchParams } = new URL(request.url)
  const isSignup = searchParams.get('signup') === 'true'
  
  return handleLogin(request, {
    authorizationParams: {
      screen_hint: isSignup ? 'signup' : 'login'
    }
  })
} 
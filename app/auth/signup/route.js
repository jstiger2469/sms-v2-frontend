import { handleLogin } from '@auth0/nextjs-auth0'

export const GET = async (request) => {
  // Force signup by using the signup parameter - updated
  return handleLogin(request, {
    authorizationParams: {
      screen_hint: 'signup'
    }
  })
} 
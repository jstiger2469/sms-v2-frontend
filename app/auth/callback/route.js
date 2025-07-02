import { handleCallback } from '@auth0/nextjs-auth0'

export const GET = async (request) => {
  try {
    console.log('Auth0 callback received')
    const result = await handleCallback(request)
    console.log('Auth0 callback successful')
    return result
  } catch (error) {
    console.error('Auth0 callback error:', error)
    // Return a more user-friendly error page
    return new Response(
      `Authentication failed: ${error.message}`,
      { 
        status: 400,
        headers: {
          'Content-Type': 'text/html'
        }
      }
    )
  }
} 
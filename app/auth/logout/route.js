import { handleLogout } from '@auth0/nextjs-auth0'

export const GET = async (request) => {
  try {
    // Use the handleLogout function with proper returnTo URL
    return await handleLogout(request, {
      returnTo: 'https://gomentor.tech'
    })
  } catch (error) {
    console.error('Logout error:', error)
    // If logout fails, just redirect to home page
    return new Response(null, {
      status: 302,
      headers: {
        Location: 'https://gomentor.tech'
      }
    })
  }
} 
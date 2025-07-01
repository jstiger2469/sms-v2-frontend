import { handleCallback } from '@auth0/nextjs-auth0'

export const GET = async (request) => {
  return handleCallback(request)
} 
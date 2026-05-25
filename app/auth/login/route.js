import { handleLogin } from '@auth0/nextjs-auth0'

export const GET = async (request) => {
  const url = new URL(request.url)
  return handleLogin(request, {
    authorizationParams: {
      redirect_uri: `${url.origin}/api/auth/callback`,
    },
  })
}

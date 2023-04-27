export { default } from 'next-auth/middleware'

// middleware to check if user is authenticated, if not: redirect to home page
export const config = {
  matcher: ['/trips', '/reservations', '/properties', '/favorites']
}


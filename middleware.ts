import { withAuth } from 'next-auth/middleware'
import { TSessionUser } from './pages/api/auth/[...nextauth]'

/* This follows as same as the declaration on 
https://next-auth.js.org/configuration/nextjs#middleware */
export default withAuth(
  /* This is only called when 'authorized' callback returns true */
  function middleware(req) {
    const user = req.nextauth.token?.user as TSessionUser
    console.log(user)
  },
  {
    callbacks: {
      authorized: () => {
        // const isNotAuthenticated: boolean = token === null
        // if (isNotAuthenticated) {
        //   return false
        // }

        // const user: TSessionUser = token?.user as TSessionUser
        // console.log('is Admin?')
        // console.log(user.role === Role.ADMIN)
        return true
      },
    },
    pages: {
      signIn: '/login',
    },
  }
)

export const config = { matcher: ['/welcome'] }

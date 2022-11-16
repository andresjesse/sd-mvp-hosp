import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
} from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions, TSessionUser } from '../../pages/api/auth/[...nextauth]'

// interface GetServerSidePropsWithAuthProps {
//   // getServerSidePropsCallback: GetServerSideProps & {
//   //   user:TSessionUser
//   // }
//   getServerSidePropsCallback: Function
// }

export default function withAuth(
  getServerSidePropsCallback: (
    ctx: GetServerSidePropsContext,
    user: TSessionUser
  ) => Promise<GetServerSidePropsResult<any>>
) {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const session: Session | null = await unstable_getServerSession(
        ctx.req,
        ctx.res,
        authOptions
      )

      if (session === null) {
        throw new Error('Session user is not present!')
      }

      const user = session.user as TSessionUser

      if (session?.user) return await getServerSidePropsCallback(ctx, user)
    } catch (error) {
      console.log(error)

      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
  }
}

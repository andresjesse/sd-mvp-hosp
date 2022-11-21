import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { UnauthenticatedUserError } from '../../errors/UnauthenticatedUserError'
import { authOptions, TSessionUser } from '../../pages/api/auth/[...nextauth]'

export default function withAuth(
  getServerSidePropsCallback: (
    ctx: GetServerSidePropsContext,
    user: TSessionUser
  ) => Promise<GetServerSidePropsResult<unknown>>
) {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const session: Session | null = await unstable_getServerSession(
        ctx.req,
        ctx.res,
        authOptions
      )

      if (session === null) {
        throw new UnauthenticatedUserError('Session user is not present!')
      }

      const user = session.user as TSessionUser

      if (session?.user) return await getServerSidePropsCallback(ctx, user)
    } catch (error) {
      console.log(error)

      return {
        redirect: {
          destination: `/login?callbackUrl=${ctx.resolvedUrl}`,
          permanent: false,
        },
      }
    }
  }
}

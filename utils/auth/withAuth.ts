import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { AuthPolicyError } from '../../errors/AuthPolicyError'
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
        throw new UnauthenticatedUserError(
          'Acesse sua conta antes de continuar.'
        )
      }

      const user = session.user as TSessionUser

      if (session?.user) return await getServerSidePropsCallback(ctx, user)
    } catch (error) {
      console.log(error)

      const isNotifiable =
        error instanceof UnauthenticatedUserError ||
        error instanceof AuthPolicyError

      if (isNotifiable) {
        return {
          redirect: {
            destination: `/login?authmessage=${
              (error as Error).message
            }&callbackUrl=${ctx.resolvedUrl}`,
            permanent: false,
          },
        }
      }

      return {
        redirect: {
          destination: '/500',
          permanent: false,
        },
      }
    }
  }
}

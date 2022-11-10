import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions, TSessionUser } from '../../pages/api/auth/[...nextauth]'
import { AuthorizationError } from './AuthorizationError'
import { Policy } from './Policies'
import RolesEnum from './RolesEnum'
import { checkRoles } from './userRolesCheck'

type TWithAuthorizationOptions = {
  expectedRoles?: Array<RolesEnum>
  rolesCheckMode?: rolesCheckModeEnum
  policies?: Array<Policy<unknown>>
}

export enum rolesCheckModeEnum {
  ALL,
  SOME,
}

export function withAuthorization(
  getServerSidePropsCallback: GetServerSideProps,
  options?: TWithAuthorizationOptions
) {
  return async (ctx: GetServerSidePropsContext) => {
    try {
      const session: Session | null = await unstable_getServerSession(
        ctx.req,
        ctx.res,
        authOptions
      )

      if (session === null) {
        throw new AuthorizationError()
      }

      const user = session.user as TSessionUser
      if (options != null) {
        if (options.expectedRoles != null) {
          const hasExpectedRoles = checkRoles(
            options.expectedRoles,
            user.roles as RolesEnum[],
            options.rolesCheckMode
          )

          if (!hasExpectedRoles) {
            throw new AuthorizationError()
          }
        }

        if (options.policies != null) {
          const passExpectedPolicies = options.policies.every(
            async (policy) => {
              const result: boolean = await (
                await policy.init(ctx, user)
              ).run(user)
              return result
            }
          )

          if (!passExpectedPolicies) {
            throw new AuthorizationError()
          }
        }
      }

      return await getServerSidePropsCallback(ctx)
    } catch (error) {
      if (!(error instanceof AuthorizationError)) {
        console.log(error)
      }

      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      }
    }
  }
}

export default withAuthorization

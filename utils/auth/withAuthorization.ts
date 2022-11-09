import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions, TSessionUser } from '../../pages/api/auth/[...nextauth]'
import { AuthorizationError } from './AuthorizationError'
import { Policy } from './Policies'
import RolesEnum from './RolesEnum'

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
        if (options.policies != null) {
          const passExpectedPolicies = options.policies.every((policy) => {
            const result = policy.run()

            return result
          })

          if (!passExpectedPolicies) {
            throw new AuthorizationError()
          }
        }

        if (options.expectedRoles != null) {
          const rolesCheckMode =
            options.rolesCheckMode ?? rolesCheckModeEnum.SOME

          const hasExpectedRoles = checkRoles(
            options.expectedRoles,
            user.roles as RolesEnum[],
            rolesCheckMode
          )

          if (!hasExpectedRoles) {
            throw new AuthorizationError()
          }
        }
      }

      return await getServerSidePropsCallback(ctx)
    } catch (error) {
      if (error instanceof AuthorizationError) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        }
      }
    }
  }
}

function checkRoles(
  expectedRoles: Array<RolesEnum>,
  userRoles: Array<RolesEnum>,
  checkMode: rolesCheckModeEnum
): boolean {
  if (checkMode === rolesCheckModeEnum.ALL) {
    return expectedRoles.every((expectedRole) => {
      return userRoles.includes(expectedRole)
    })
  } else {
    return expectedRoles.some((expectedRole) => {
      return userRoles.includes(expectedRole)
    })
  }
}

export default withAuthorization

import { AuthPolicyError } from '../../../errors/AuthPolicyError'
import { TSessionUser } from '../../../pages/api/auth/[...nextauth]'
import Roles from '../Roles'

export enum rolesCheckModeEnum {
  ALL,
  SOME,
}

export default async function allowByRolePolicy(
  user: TSessionUser,
  roles: Roles[],
  checkMode: rolesCheckModeEnum = rolesCheckModeEnum.ALL
) {
  const hasRequiredRoles =
    checkMode === rolesCheckModeEnum.ALL
      ? roles.every((expectedRole) => {
          return user.roles.includes(expectedRole)
        })
      : roles.some((expectedRole) => {
          return user.roles.includes(expectedRole)
        })

  if (!hasRequiredRoles) {
    throw new AuthPolicyError('User lacks required roles.')
  }
}

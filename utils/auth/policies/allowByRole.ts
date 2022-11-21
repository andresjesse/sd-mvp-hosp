import { AuthPolicyError } from '../../../errors/AuthPolicyError'
import { TSessionUser } from '../../../pages/api/auth/[...nextauth]'
import Roles from '../Roles'

export enum RolesCheckModeEnum {
  REQUIRE_ALL,
  ACCEPT_ANY,
}

export default async function allowByRole(
  user: TSessionUser,
  roles: Roles[],
  checkMode: RolesCheckModeEnum = RolesCheckModeEnum.REQUIRE_ALL
) {
  const hasRequiredRoles =
    checkMode === RolesCheckModeEnum.REQUIRE_ALL
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

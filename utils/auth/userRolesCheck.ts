import RolesEnum from './RolesEnum'
import { rolesCheckModeEnum } from './withAuthorization'

export function checkRoles(
  expectedRoles: Array<RolesEnum>,
  userRoles: Array<RolesEnum>,
  checkMode: rolesCheckModeEnum = rolesCheckModeEnum.SOME
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

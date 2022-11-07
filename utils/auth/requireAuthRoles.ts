import { RolesEnum } from '@prisma/client'
import { IncomingMessage, ServerResponse } from 'http'
import { Session } from 'next-auth'
import { TSessionUser } from '../../pages/api/auth/[...nextauth]'
import { ApiHandleError } from '../api/apiHandleError'
import { requireAuth } from './requireAuth'

export async function requireAuthRoles(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string
    }>
  },
  res: ServerResponse<IncomingMessage>,
  expectedRoles: RolesEnum[]
): Promise<TSessionUser | null> {
  const session: Session | null = await requireAuth(req, res)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = session!.user as TSessionUser

  const failedRoles = expectedRoles.filter(async (expectedRole) => {
    console.log('expectedRole: ', expectedRole)
    console.log('userRole: ', user.roles)
    console.log(!user.roles?.includes(expectedRole))
    if (!user.roles?.includes(expectedRole)) {
      return true
    }
  })
  console.log(failedRoles.length)
  console.log(failedRoles)
  if (failedRoles.length >= 1) {
    throw new ApiHandleError(403, 'Forbbiden!')
  }

  return user
}

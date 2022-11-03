import { Role } from '@prisma/client'
import { IncomingMessage, ServerResponse } from 'http'
import { Session } from 'next-auth'
import { TSessionUser } from '../../pages/api/auth/[...nextauth]'
import { requireAuth } from './requireAuth'

export async function requireAuthRoles(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string
    }>
  },
  res: ServerResponse<IncomingMessage>,
  expectedRoles: Role[]
  // unauthorizedRedirectURL = '/login'
): Promise<TSessionUser | null> {
  const session: Session | null = await requireAuth(req, res)

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = session!.user as TSessionUser

  if (!user.roles.include()) {
  }

  // expectedRoles.forEach(async (role) => {
  //   const expectedRoleKey = (role as string).toLowerCase() as 'admin' | 'doctor'
  //   const expectedRole = user[expectedRoleKey]

  //   if (expectedRole === null) {
  //     // res.writeHead(302, {
  //     //   location: unauthorizedRedirectURL,
  //     // })
  //     // res.end()
  //     throw new ApiHandleError(401, 'Unauthorized!')
  //   }
  // })

  return user
}

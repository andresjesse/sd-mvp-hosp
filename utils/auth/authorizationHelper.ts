import { Role } from '@prisma/client'
import { IncomingMessage, ServerResponse } from 'http'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions, TSessionUser } from '../../pages/api/auth/[...nextauth]'

export async function isAuthenticatedCheck(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string
    }>
  },
  res: ServerResponse<IncomingMessage>
): Promise<Session | null> {
  const session: Session | null = await unstable_getServerSession(
    req,
    res,
    authOptions
  )

  if (session === null) {
    res.writeHead(301, {
      location: '/login',
    })
    res.end()
  }

  return session
}

export async function hasRoleCheck(
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string
    }>
  },
  res: ServerResponse<IncomingMessage>,
  expectedRoles: Role[],
  unauthorizedRedirectURL = '/login'
): Promise<TSessionUser | null> {
  const session: Session | null = await isAuthenticatedCheck(req, res)

  if (session === null) {
    return null
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = session!.user as TSessionUser

  expectedRoles.forEach(async (role) => {
    const expectedRoleKey = (role as string).toLowerCase() as 'admin' | 'doctor'
    const expectedRole = user[expectedRoleKey]

    if (expectedRole === null) {
      res.writeHead(301, {
        location: unauthorizedRedirectURL,
      })
      res.end()
    }
  })

  return user
}

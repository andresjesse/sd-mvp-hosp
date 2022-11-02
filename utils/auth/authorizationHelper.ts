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
  expectedRoles: Array<Role>,
  unauthorizedCallback?: () => unknown
): Promise<TSessionUser | null> {
  const session: Session | null = await isAuthenticatedCheck(req, res)

  if (session === null) {
    return null
  }

  const user = session.user as TSessionUser

  const failedRoleChecks: Role[] = expectedRoles.filter((role) => {
    const expectedRoleKey = role.toLowerCase() as 'admin' | 'doctor'
    const expectedRole = user[expectedRoleKey]

    if (expectedRole === null) {
      return role
    }
  })

  if (failedRoleChecks.length >= 1) {
    const hasCustomCallback = unauthorizedCallback != undefined
    if (hasCustomCallback) {
      await unauthorizedCallback()
    } else {
      res.writeHead(301, {
        location: '/login',
      })
    }

    return null
  }

  return user
}

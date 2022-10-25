import { Role } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions, TSessionUser } from '../../pages/api/auth/[...nextauth]'

export async function isAuthenticatedCheck(
  req: NextApiRequest,
  res: NextApiResponse,
  unauthenticatedCallback?: () => unknown
): Promise<Session | null> {
  const session: Session | null = await unstable_getServerSession(
    req,
    res,
    authOptions
  )

  if (session === null) {
    const hasCustomCallback = unauthenticatedCallback != undefined
    if (hasCustomCallback) {
      await unauthenticatedCallback()
    } else {
      res.redirect('/login')
    }

    return null
  }

  return session
}

export async function hasRoleCheck(
  req: NextApiRequest,
  res: NextApiResponse,
  role: Role,
  unauthorizedCallback?: () => unknown
): Promise<TSessionUser | null> {
  const session: Session | null = await isAuthenticatedCheck(req, res)

  if (session === null) {
    return null
  }

  const user = session.user as TSessionUser

  if (user.role != role) {
    const hasCustomCallback = unauthorizedCallback != undefined
    if (hasCustomCallback) {
      await unauthorizedCallback()
    } else {
      res.redirect('/login')
    }

    return null
  }

  return user
}

import { IncomingMessage, ServerResponse } from 'http'
import { Session, unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../pages/api/auth/[...nextauth]'
import { ApiHandleError } from '../api/apiHandleError'

export async function requireAuth(
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
    throw new ApiHandleError(401, 'Unauthorized!')
  }

  return session
}

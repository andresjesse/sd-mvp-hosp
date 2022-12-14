import { Admin, Doctor, Role, User } from '@prisma/client'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import Roles from '../../../utils/auth/Roles'
import { prisma } from './../../../lib/prisma'
import hasher from './../../../utils/hasher/BcryptjsHasher'
import { InvalidCredentialsError } from '../../../errors/InvalidCredentialsError'

/** Any changes on this type definition requires changes on 'auth.d.ts' file which mirrors this.*/
export type TSessionUser = {
  id: number
  name: string
  email: string
  roles: Roles[]
  admin: Admin | null
  doctor: Doctor | null
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (
        credentials: Record<'email' | 'password', string> | undefined
      ): Promise<TSessionUser> => {
        try {
          const email = credentials?.email
          const password = credentials?.password

          type CompositeUser =
            | (User & {
                admin: Admin | null
                doctor: Doctor | null
                roles: Role[]
              })
            | null

          const user: CompositeUser = await prisma.user.findUnique({
            where: {
              email: email,
            },
            include: {
              admin: true,
              doctor: true,
              roles: true,
            },
          })

          if (!user) {
            throw new InvalidCredentialsError()
          }

          const samePassword = await hasher.compareAsync(
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            password!,
            user.passwordHash
          )

          if (!samePassword) {
            throw new InvalidCredentialsError()
          }

          const sessionUser: TSessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles?.map<Roles>((roleEntry) => roleEntry.id) || [],
            admin: user.admin,
            doctor: user.doctor,
          }
          return sessionUser
        } catch (e) {
          console.log(e)
          const { message } =
            e instanceof InvalidCredentialsError
              ? { message: (e as InvalidCredentialsError).message }
              : {
                  message:
                    'Unexpected error occourred. Try again or contact us.',
                }

          throw new Error(message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      session.user = token.user as TSessionUser
      return session
    },
  },
}

export default NextAuth(authOptions)

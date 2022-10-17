import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import authorize, { TSessionUser } from "./signin/authorize";
import { Admin, Doctor, Role, User } from "@prisma/client";
import hasher from "./../../../utils/hasher/BcryptjsHasher";
import { prisma } from "./../../../lib/prisma";
import { InvalidCredentials } from "./signin/invalidCredentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials: any, req: any): Promise<TSessionUser> => {
        try {
          const { email, password } = credentials;

          type CompositeUser =
            | (User & {
                admin: Admin | null;
                doctor: Doctor | null;
              })
            | null;

          let user: CompositeUser = await prisma.user.findUnique({
            where: {
              email: email,
            },
            include: {
              admin: true,
              doctor: true,
            },
          });

          if (!user) {
            throw new InvalidCredentials();
          }

          const samePassword = await hasher.compareAsync(
            password,
            user.passwordHash
          );

          if (!samePassword) {
            throw new InvalidCredentials();
          }

          const sessionUser: TSessionUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            admin: user.admin,
            doctor: user.doctor,
          };

          return sessionUser;
        } catch (e) {
          const { message } =
            e instanceof InvalidCredentials
              ? { message: (e as InvalidCredentials).message }
              : {
                  message:
                    "Unexpected error occourred. Try again or contact us.",
                };

          throw new Error(message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as TSessionUser;
      return session;
    },
  },
};

export default NextAuth(authOptions);

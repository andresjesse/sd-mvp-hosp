import { Admin, Doctor, Role, User } from "@prisma/client";
import hasher from "../../../../utils/hasher/BcryptjsHasher";
import { prisma } from "../../../../lib/prisma";
import { InvalidCredentials } from "./invalidCredentials";

// public user object
export type TSessionUser = {
  id: number;
  name: string;
  email: string;
  role: Role;
  admin: Admin | null;
  doctor: Doctor | null;
};

const authorize = async (
  credentials: any,
  req: any
): Promise<TSessionUser | null> => {
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

    const samePassword = await hasher.compareAsync(password, user.passwordHash);

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
        : { message: "Unexpected error occourred. Try again or contact us." };

    throw new Error(message);
  }
};

export default authorize;

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import hasher from "../../../utils/hasher/BcryptjsHasher";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../lib/prisma";
import { THasherError, THashResponse } from "../../../utils/hasher/HasherTypes";
import { Admin, Doctor, Role } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Doctor | null>
) {
  if (req.method === "POST") {
    try {
      console.log(req.body);

      const { name, email, password, crm, crmUf } = req.body;

      // THIS WILL CHANGE!
      const hashOperation: THasherError | THashResponse =
        await hasher.hashAsync(password);
      const passwordHash: string = (hashOperation as THashResponse).hashedInput;
      // THIS WILL CHANGE END!

      const doctor = await prisma.doctor.create({
        data: {
          crm,
          crmUf,
          user: {
            create: {
              name,
              email,
              passwordHash,
            },
          },
        },
      });

      res.status(201).json(doctor);
    } catch (error) {
      //TODO: migate to error handler
      console.log(error);
      res.status(500).json(null);
    }
  }
}

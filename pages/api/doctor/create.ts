// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Doctor } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import hasher from '../../../utils/hasher/BcryptjsHasher'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Doctor | null>
) {
  if (req.method === 'POST') {
    try {
      console.log(req.body)

      const { name, email, password, crm, crmUf } = req.body

      const passwordHash = await hasher.hashAsync(password)

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
      })

      res.status(201).json(doctor)
    } catch (error) {
      //TODO: migate to error handler
      console.log(error)
      res.status(500).json(null)
    }
  }
}

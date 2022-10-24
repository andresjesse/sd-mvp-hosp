// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Doctor } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import withErrorHandler from '../../../utils/api/withErrorHandler'
import hasher from '../../../utils/hasher/BcryptjsHasher'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Doctor | null>
) => {
  if (req.method === 'POST') {
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
  }
}

export default withErrorHandler(handlerFunction)

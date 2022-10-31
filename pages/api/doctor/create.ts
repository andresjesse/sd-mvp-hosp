// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Doctor } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { ApiHandleError } from '../../../utils/api/apiHandleError'
import withErrorHandler from '../../../utils/api/withErrorHandler'
import hasher from '../../../utils/hasher/BcryptjsHasher'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Doctor | null>
) => {
  if (req.method === 'POST') {
    const { name, email, password, crm, crmUf } = req.body

    const errors: { [key: string]: string | Iterable<string> } = {}
    if (!name) errors['name'] = ["Name can't be empty!"]
    if (!email) errors['email'] = ["Email can't be empty!"]
    if (!password) errors['password'] = ["Password can't be empty!"]
    if (!crm) errors['crm'] = ["CRM can't be empty!"]
    if (!crmUf) errors['crmUf'] = ["CRM UF can't be empty!"]
    if (Object.keys(errors).length > 0) throw new ApiHandleError(400, errors)

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

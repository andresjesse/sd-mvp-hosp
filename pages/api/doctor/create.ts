// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Doctor } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { ApiHandleError } from '../../../errors/ApiHandleError'
import withErrorHandler from '../../../utils/api/withErrorHandler'
import hasher from '../../../utils/hasher/BcryptjsHasher'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Doctor | null>
) => {
  if (req.method === 'POST') {
    const { name, email, password, crm, crmUf } = req.body

    const errors: { [key: string]: string | Iterable<string> } = {}
    if (!name) errors['name'] = ["Nome não pode ser vazio!"]
    if (!email) errors['email'] = ["Email não pode ser vazio!"]
    if (!password) errors['password'] = ["Senha não pode ser vazio!"]
    if (!crm) errors['crm'] = ["CRM não pode ser vazio!"]
    if (!crmUf) errors['crmUf'] = ["CRM UF não pode ser vazio!"]
    const aux = await prisma.user.findUnique({
      where:{ email: String(email)}
    })
    if(aux != null) errors['email'] = ["Email já cadastrado!"]
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

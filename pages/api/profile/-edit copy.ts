// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Doctor } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiHandleError } from '../../../errors/ApiHandleError'
import { prisma } from '../../../lib/prisma'
import withErrorHandler from '../../../utils/api/withErrorHandler'
import hasher from '../../../utils/hasher/BcryptjsHasher'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Doctor | null>
) => {
  if (req.method === 'POST') {
    const { name, email, newEmail, password, newPassword, crm, crmUf } =
      req.body

    const errors: { [key: string]: string | Iterable<string> } = {}
    if (!name) errors['name'] = ['Nome não pode ser vazio!']
    if (!email) errors['email'] = ['Email não pode ser vazio!']
    if (!password) errors['password'] = ['Senha não pode ser vazio!']
    if (!crm) errors['crm'] = ['CRM não pode ser vazio!']
    if (!crmUf) errors['crmUf'] = ['CRM UF não pode ser vazio!']
    const user = await prisma.user.findUnique({
      where: { email: String(email) },
    })
    console.log(user)
    if (user == null) errors['email'] = ['Usuário não encontrado!']

    if (Object.keys(errors).length > 0) throw new ApiHandleError(400, errors)

    const passwordHash = await hasher.hashAsync(password)

    /* const updatedDoctor = await prisma.shift.update({
        data: {
          idDoctor: idDoctor ? idDoctor : null,
        },
        where: {
          id: shift.id,
        },
      })

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

*/
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: 1,
      },
      include: {
        user: true,
      },
    })
    res.status(200).json(doctor)
  }
}

export default withErrorHandler(handlerFunction)

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Doctor } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { Session, unstable_getServerSession } from 'next-auth'
import { UnauthenticatedUserError } from '../../../errors/UnauthenticatedUserError'
import { ApiHandleError } from '../../../errors/ApiHandleError'
import withErrorHandler from '../../../utils/api/withErrorHandler'
import { authOptions, TSessionUser } from '../auth/[...nextauth]'
import hasher from '../../../utils/hasher/BcryptjsHasher'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Doctor | null>
) => {
  if (req.method === 'POST') {
    const session: Session | null = await unstable_getServerSession(
      req,
      res,
      authOptions
    )

    //const { name, email, password, crm, crmUf } = req.body

    if (session === null || session.user === undefined) {
      throw new UnauthenticatedUserError('Acesse sua conta antes de continuar.')
    }

    const user = session.user as TSessionUser
    console.log('TSessionUser', user)
    //console.log(req.body)

    const { name, email, password, crm, crmUf } = req.body

    const aux = await prisma.doctor.findUnique({
      where: { userId: user.id },
    })
    const errors: { [key: string]: string | Iterable<string> } = {}
    if (!name) errors['name'] = ['Nome não pode ser vazio!']
    if (!email) errors['email'] = ['Email não pode ser vazio!']
    if (!crm && aux != null) errors['crm'] = ['CRM não pode ser vazio!']
    if (!crmUf && aux != null) errors['crmUf'] = ['CRM UF não pode ser vazio!']

    if (Object.keys(errors).length > 0) throw new ApiHandleError(400, errors)

    if (password) {
      const passwordHash = await hasher.hashAsync(password)

      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: name,
          email: email,
          passwordHash: passwordHash,
        },
      })
      console.log(updatedUser)
    } else {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: name,
          email: email,
        },
      })
      console.log(updatedUser)
    }

    if (aux != null) {
      const updatedDoctor = await prisma.doctor.update({
        where: {
          userId: user.id,
        },
        data: {
          crm: crm,
          crmUf: crmUf,
        },
      })
      console.log(updatedDoctor)
    }

    //     const doctor = await prisma.doctor.create({
    //       data: {
    //         crm,
    //         crmUf,
    //         user: {
    //           create: {
    //             name,
    //             email,
    //             passwordHash,
    //           },
    //         },
    //       },
    //     })

    //
    //     const doctor = await prisma.doctor.findUnique({
    //       where: {
    //         id: 1,
    //       },
    //       include: {
    //         user: true,
    //       },
    //     })
    res.status(200).end()
  }
}

export default withErrorHandler(handlerFunction)

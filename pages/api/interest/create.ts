// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Interest } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import { ApiHandleError } from '../../../utils/api/apiHandleError'
import withErrorHandler from '../../../utils/api/withErrorHandler'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Interest | null>
) => {
  if (req.method === 'POST') {
    const { day, idDoctor, turno, status } = req.body

    const errors: { [key: string]: string | Iterable<string> } = {}
    if (!idDoctor) errors['idDoctor'] = ["Doctor can't be empty!"]
    if (!day) errors['day'] = ["day can't be empty!"]
    if (!turno) errors['shift'] = ["shift can't be empty!"]
    if (!status) errors['status'] = ["status can't be empty!"]
    if (Object.keys(errors).length > 0) throw new ApiHandleError(400, errors)

    const interest = await prisma.interest.create({
      data: {
        day,
        turno,
        idDoctor,
        status,
        doctor: {
          connect: {
            id: idDoctor,
          },
        },
      },
    })

    res.status(201).json(interest)
  }
}

export default withErrorHandler(handlerFunction)

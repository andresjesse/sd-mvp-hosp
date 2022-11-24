// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Interest } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiHandleError } from '../../../errors/ApiHandleError'
import { prisma } from '../../../lib/prisma'
import withErrorHandler from '../../../utils/api/withErrorHandler'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Interest | null>
) => {
  if (req.method === 'POST') {
    const { startDate, endDate, idSector } = req.body

    //TODO: get idDoctor from session
    //TODO: validate shift start and end date with SHIFTS constant
    const idDoctor = 1

    const errors: { [key: string]: string | Iterable<string> } = {}
    if (!startDate)
      errors['startDate'] = ["startDate: UTC Datetime can't be empty!"]
    if (!endDate) errors['endDate'] = ["endDate: UTC Datetime can't be empty!"]
    if (!idSector) errors['idSector'] = ["idSector can't be empty!"]
    if (Object.keys(errors).length > 0) throw new ApiHandleError(400, errors)

    let interest = await prisma.interest.findFirst({
      where: {
        startDate,
        endDate,
        idSector,
      },
    })

    if (interest) {
      interest = await prisma.interest.delete({
        where: {
          id: interest.id,
        },
      })
    } else {
      interest = await prisma.interest.create({
        data: {
          startDate,
          endDate,
          sector: {
            connect: {
              id: idSector,
            },
          },
          doctor: {
            connect: {
              id: idDoctor,
            },
          },
        },
      })
    }

    res.status(200).json(interest)
  }
}

export default withErrorHandler(handlerFunction)

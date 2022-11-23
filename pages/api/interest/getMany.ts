// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { Interest } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiHandleError } from '../../../errors/ApiHandleError'
import { prisma } from '../../../lib/prisma'
import withErrorHandler from '../../../utils/api/withErrorHandler'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Interest[]>
) => {
  if (req.method === 'POST') {
    //TODO: get from session
    const idDoctor = 1

    const errors: { [key: string]: string | Iterable<string> } = {}
    if (!idDoctor) errors['idDoctor'] = ["Doctor can't be empty!"]
    if (Object.keys(errors).length > 0) throw new ApiHandleError(400, errors)

    const interest = await prisma.interest.findMany({
      where: {
        idDoctor,
      },
    })

    res.status(200).json(interest)
  }
}

export default withErrorHandler(handlerFunction)

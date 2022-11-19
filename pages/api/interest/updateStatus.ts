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
    const { id, status } = req.body

    const errors: { [key: string]: string | Iterable<string> } = {}
    if (!id) errors['id'] = ["id can't be empty!"]
    //if (!status) errors['status'] = ["status can't be empty!"]
    if (Object.keys(errors).length > 0) throw new ApiHandleError(400, errors)

    const interest = await prisma.interest.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })

    res.status(201).json(interest)
  }
}

export default withErrorHandler(handlerFunction)

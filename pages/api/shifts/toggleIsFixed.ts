import { Shift } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiHandleError } from '../../../errors/ApiHandleError'
import { prisma } from '../../../lib/prisma'
import withErrorHandler from '../../../utils/api/withErrorHandler'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Shift | null>
) => {
  if (req.method === 'POST') {
    const { shift } = req.body

    const errors: { [key: string]: string | Iterable<string> } = {}
    if (Object.keys(errors).length > 0) throw new ApiHandleError(400, errors)

    const updatedShift = await prisma.shift.update({
      data: {
        isFixed: !shift.isFixed,
      },
      where: {
        id: shift.id,
      },
    })

    res.status(200).json(updatedShift)
  }
}

export default withErrorHandler(handlerFunction)

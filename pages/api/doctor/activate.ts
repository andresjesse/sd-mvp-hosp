import { Doctor } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ApiHandleError } from '../../../errors/ApiHandleError'
import { prisma } from '../../../lib/prisma'
import withErrorHandler from '../../../utils/api/withErrorHandler'

const handlerFunction = async (
  req: NextApiRequest,
  res: NextApiResponse<Doctor | null>
) => {
  if (req.method === 'POST') {
    const { active, id } = req.body

    const errors: { [key: string]: string | Iterable<string> } = {}
    if (Object.keys(errors).length > 0) throw new ApiHandleError(400, errors)

    const updateDoctor = await prisma.doctor.update({
      data: {
        isActive: active,
      },
      where: {
        id: id,
      },
    })

    res.status(200).json(updateDoctor)
  }
}

export default withErrorHandler(handlerFunction)

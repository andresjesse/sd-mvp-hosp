import { Shift } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Shift | null>
) {
  if (req.method === 'POST') {
    try {
      const data = JSON.parse(req.body)

      const shift = await prisma.shift.create({
        data: data,
      })

      res.status(201).json(shift)
    } catch (error) {
      //TODO: migate to error handler
      console.log(error)
      res.status(500).json(null)
    }
  }
}

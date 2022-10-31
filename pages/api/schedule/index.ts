import { Shift } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Shift | null>
) {
  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 1)
    const days = []
    while (date.getMonth() === month) {
      days.push(new Date(date))
      date.setDate(date.getDate() + 1)
    }
    return days
  }

  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body)

      // console.log(body)
      console.log(getDaysInMonth(body.month, body.year))

      res.status(201).json(body)
    } catch (error) {
      console.log(error)
      res.status(500).json(null)
    }
  }
}

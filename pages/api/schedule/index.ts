import { Shift } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Shift | null>
) {
  if (req.method === 'POST') {
    try {
      const body = JSON.parse(req.body)

      const getDaysInMonth = (month: number, year: number) => {
        const date = new Date(year, month, 1)
        const days = []
        while (date.getMonth() === month) {
          days.push(new Date(date))
          date.setDate(date.getDate() + 1)
        }
        return days
      }

      console.log(getDaysInMonth(body.month, body.year))

      res.status(201).json(body)
    } catch (error) {
      console.log(error)
      res.status(500).json(null)
    }
  }
}
//   shift model
//   {
//     startDate: JSON.parse(JSON.stringify(new Date('2022-10-10'))),
//     endDate: JSON.parse(JSON.stringify(new Date('2022-10-10'))),
//     idDoctor: 1,
//     idSector: 91,
//     isFixed: true,
//   }

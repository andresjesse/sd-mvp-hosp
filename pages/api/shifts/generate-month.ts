import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import formatHashShift from '../../../services/formatHashShift'
import { ApiHandleError } from '../../../utils/api/apiHandleError'

// helper function
const createDateUTC = (baseDate: Date, utcHour: number) => {
  return new Date(
    Date.UTC(
      baseDate.getFullYear(),
      baseDate.getMonth(),
      baseDate.getDate(),
      utcHour
    )
  )
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | null>
) {
  if (req.method === 'POST') {
    try {
      const { month, year } = req.body

      //check params (you can also return a single ApiHandleError with an array of erros, check /api/doctor/create for details)
      if (!month) throw new ApiHandleError(400, 'month is required!')
      if (!year) throw new ApiHandleError(400, 'year is required!')

      const sectors = await prisma.sector.findMany()

      const shiftsToGenerate: Array<{
        startDate: Date
        endDate: Date
        isFixed: boolean
        idSector: number
        hash: string
      }> = []

      // Define consts (for now shifts are fixed)
      const SHIFTS = [
        {
          START_UTC: 10, // 7AM in localtime (America/Sao_Paulo)
          END_UTC: 22, //7PM in localtime (America/Sao_Paulo)
        },
        {
          START_UTC: 22, // 7PM in localtime (America/Sao_Paulo)
          END_UTC: 22 + 12, //7AM (next day +12h) in localtime (America/Sao_Paulo)
        },
      ]

      const date = new Date(year, month, 1)
      while (date.getMonth() === month) {
        sectors.forEach((sector) => {
          SHIFTS.forEach((shift) => {
            const startDate = createDateUTC(date, shift.START_UTC)
            const endDate = createDateUTC(date, shift.END_UTC)

            shiftsToGenerate.push({
              startDate,
              endDate,
              idSector: sector.id,
              isFixed: false,
              hash: formatHashShift(startDate, sector.id),
            })

            console.log('generating: ', sector.abbreviation, startDate)

            console.log(
              '\t',
              startDate.toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
              }),
              endDate.toLocaleString('pt-BR', {
                timeZone: 'America/Sao_Paulo',
              })
            )
          })
        })

        date.setDate(date.getDate() + 1)
      }

      const generatedShifts = await prisma.$transaction([
        ...shiftsToGenerate.map((shift) =>
          prisma.shift.upsert({
            where: {
              hash: shift.hash,
            },
            create: {
              ...shift,
            },
            update: {},
          })
        ),
      ])

      res.status(201).json(`generated ${generatedShifts.length} shifts!`)
    } catch (error) {
      console.log(error)
      res.status(500).json(null)
    }
  }
}

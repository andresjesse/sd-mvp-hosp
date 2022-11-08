import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma'
import formatHashShift from '../../../services/formatHashShift'
import { ApiHandleError } from '../../../utils/api/apiHandleError'
import withErrorHandler from '../../../utils/api/withErrorHandler'

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

async function handlerFunction(
  req: NextApiRequest,
  res: NextApiResponse<string | null>
) {
  if (req.method === 'POST') {
    const { month, year } = req.body

    if (typeof month !== 'number')
      throw new ApiHandleError(400, 'month is required!')
    if (month < 0 || month > 11)
      throw new ApiHandleError(
        400,
        'month must be a number between 0 (january) and 11 (december)!'
      )
    if (typeof year !== 'number')
      throw new ApiHandleError(400, 'year is required!')
    if (year < 2022) {
      throw new ApiHandleError(400, 'year must be 2022 or superior')
    }

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

    date.setMonth(date.getMonth() - 1)
    res
      .status(201)
      .json(
        `Geradas ${generatedShifts.length} escalas para ${date.toLocaleString(
          'pt-br',
          { month: 'long', year: 'numeric' }
        )}`
      )
  }
}

export default withErrorHandler(handlerFunction)

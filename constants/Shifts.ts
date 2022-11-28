// Define consts (for now shifts are fixed)
export type FixedShift = {
  START_UTC: number
  END_UTC: number
}

const SHIFTS: Array<FixedShift> = [
  {
    START_UTC: 10, // 7AM in localtime (America/Sao_Paulo)
    END_UTC: 22, //7PM in localtime (America/Sao_Paulo)
  },
  {
    START_UTC: 22, // 7PM in localtime (America/Sao_Paulo)
    END_UTC: 22 + 12, //7AM (next day +12h) in localtime (America/Sao_Paulo)
  },
]

export default SHIFTS

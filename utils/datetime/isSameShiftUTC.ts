import { FixedShift } from '../../constants/Shifts'

const isSameShiftUTC = (start: Date, end: Date, shift: FixedShift) => {
  return (
    start.getUTCHours() === shift.START_UTC &&
    end.getUTCHours() === shift.END_UTC % 24
  )
}

export default isSameShiftUTC

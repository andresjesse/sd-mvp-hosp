import { Shift } from '@prisma/client'
import { Badge } from 'antd'

interface ShiftProps {
  data: Shift
}

export default function ShiftComponent({ data }: ShiftProps) {
  const shift = JSON.parse(JSON.stringify(data))
  const doctorName = !shift.doctor ? 'Vago' : shift.doctor.user.name

  const getFormatedHour = (date: Date) => {
    return (date.getHours() < 10 ? '0' : '') + date.getHours()
  }

  const badgeColor = !shift.doctor ? 'gold' : 'cyan'

  const startDate = getFormatedHour(new Date(shift.startDate))

  const text = `${shift.sector.abbreviation} ${startDate} - ${doctorName}`

  return <Badge color={badgeColor} text={text} style={{ marginBottom: 5 }} />
}

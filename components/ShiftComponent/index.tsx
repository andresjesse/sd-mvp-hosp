import { Shift } from '@prisma/client'
import { Badge, Tag } from 'antd'

interface ShiftProps {
  data: Shift
}

export default function ShiftComponent({ data }: ShiftProps) {
  const shift = JSON.parse(JSON.stringify(data))
  const doctorName = !shift.doctor ? 'Vago' : shift.doctor.user.name
  const badgeColor = !shift.doctor ? 'gold' : 'cyan'

  const getFormatedHour = (date: Date) => {
    const shiftHour = (date.getHours() < 10 ? '0' : '') + date.getHours()
    const shiftMinute = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()

    return shiftHour + ':' + shiftMinute
  }

  return (
    /*<Tag
      style={{
        minWidth: '90%',
        textAlign: 'right',
        fontWeight: 'bold',
      }}
      color={!doctorName ? 'warning' : '#13c2c2'}
    >
      {!doctorName ? 'Vago' : doctorName}
    </Tag>*/
    <Badge
      color={badgeColor}
      text={getFormatedHour(new Date(shift.startDate)) + ' - ' + doctorName}
    />
  )
}

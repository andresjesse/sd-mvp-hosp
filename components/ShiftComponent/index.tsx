import { Shift } from '@prisma/client'
import { Tag } from 'antd'

interface ShiftProps {
  data: Shift
}

export default function ShiftComponent({ data }: ShiftProps) {
  const shift = JSON.parse(JSON.stringify(data))
  const doctorName = shift.doctor?.user.name

  return (
    <Tag
      style={{
        minWidth: '90%',
        textAlign: 'right',
        fontWeight: 'bold',
      }}
      color={!doctorName ? 'warning' : '#13c2c2'}
    >
      {!doctorName ? 'Vago' : doctorName}
    </Tag>
  )
}

import { Tag } from 'antd'
import React from 'react'
import { TShift } from '../../services/fakeData'

interface ShiftProps {
  data: TShift
}

export default function Shift({ data }: ShiftProps) {
  return (
    <Tag
      style={{ minWidth: '90%', textAlign: 'right', fontWeight: 'bold' }}
      color={data.color}
    >
      {data.doctorName}
    </Tag>
  )
}

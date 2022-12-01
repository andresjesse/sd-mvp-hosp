import { prisma } from './../../lib/prisma'
import { Doctor, Sector, Shift, User } from '@prisma/client'
import { Calendar } from 'antd'
import { Moment } from 'moment'
import { GetServerSideProps } from 'next'
import ScheduleCell from '../../components/ScheduleCell'

export type CompositeShift = Shift & {
  doctor:
    | (Doctor & {
        user: User
      })
    | null
  sector: Sector
}

export type CompositeDoctor = Doctor & {
  user: User
}

interface SchedulePageProps {
  shifts: Array<CompositeShift>
  doctors: Array<CompositeDoctor>
}

const getListData = (value: Moment, shifts: Array<CompositeShift>) => {
  const listData: Array<CompositeShift> = []

  shifts.forEach(async (shift) => {
    const date = new Date(shift.startDate)
    if (
      date.getDate() == value.date() &&
      date.getMonth() == value.month() &&
      date.getFullYear() == value.year()
    ) {
      listData.push(shift)
    }
  })

  return listData
}

export default function SchedulePage({ shifts, doctors }: SchedulePageProps) {
  const dateCellRender = (value: Moment) => {
    const listData = getListData(value, shifts)
    return (
      <div>
        <ScheduleCell shifts={listData} doctors={doctors} />
      </div>
    )
  }

  return (
    <div>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const shifts = await prisma.shift.findMany({
    include: {
      doctor: {
        include: {
          user: true,
        },
      },
      sector: true,
    },
  })

  const doctors = await prisma.doctor.findMany({
    include: {
      user: true,
    },
  })

  return {
    props: {
      shifts: JSON.parse(JSON.stringify(shifts)), //next does not serialize objects like prisma Datetime
      doctors: JSON.parse(JSON.stringify(doctors)), //next does not serialize objects like prisma Datetime
    },
  }
}

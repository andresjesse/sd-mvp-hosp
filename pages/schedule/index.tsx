import { Doctor, Shift } from '@prisma/client'
import { Calendar } from 'antd'
import { Moment } from 'moment'
import { GetServerSideProps } from 'next'
import ScheduleCell from '../../components/ScheduleCell'

const getListData = (value: Moment, schedules: Array<Shift>) => {
  const listData: Array<Shift> = []

  schedules.forEach(async (schedule) => {
    const date = new Date(schedule.startDate)
    if (
      date.getDate() == value.date() &&
      date.getMonth() == value.month() &&
      date.getFullYear() == value.year()
    ) {
      listData.push(schedule)
    }
  })

  return listData
}

interface SchedulePageProps {
  schedules: Array<Shift>
  doctors: Array<Doctor>
}

export default function SchedulePage({
  schedules,
  doctors,
}: SchedulePageProps) {
  const dateCellRender = (value: Moment) => {
    const listData = getListData(value, schedules)
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
  const schedules = await prisma?.shift.findMany({
    include: {
      doctor: {
        include: {
          user: true,
        },
      },
    },
    where: {
      idSector: 1,
    },
  })

  const doctors = await prisma?.doctor.findMany({
    include: {
      user: true,
    },
  })

  return {
    props: {
      schedules: JSON.parse(JSON.stringify(schedules)),
      doctors: JSON.parse(JSON.stringify(doctors)),
    },
  }
}

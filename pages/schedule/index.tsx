import { Shift } from '@prisma/client'
import { Calendar } from 'antd'
import { Moment } from 'moment'
import { GetServerSideProps } from 'next'
import ShiftComponent from '../../components/ShiftComponent'
import styles from './styles.module.css'

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

  //console.log(listData)

  return listData
}

interface SchedulePageProps {
  schedules: Array<Shift>
}

export default function SchedulePage({ schedules }: SchedulePageProps) {
  const dateCellRender = (value: Moment) => {
    const listData = getListData(value, schedules)
    return (
      <ul className={styles.events}>
        {listData?.map((shift) => (
          <li key={shift.id}>
            <ShiftComponent data={shift} />
          </li>
        ))}
      </ul>
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
  })
  //console.log(JSON.parse(JSON.stringify(schedules))[99].doctor)

  return {
    props: {
      schedules: JSON.parse(JSON.stringify(schedules)),
    },
  }
}

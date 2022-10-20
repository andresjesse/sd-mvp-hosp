import { Calendar } from 'antd'
import { Moment } from 'moment'
import { GetServerSideProps } from 'next'
import Schedule from '../../components/Shift'
import { fakeSchedules, TShift } from '../../services/fakeData'
import styles from './styles.module.css'

const getListData = (value: Moment, schedules: Array<TShift>) => {
  const listData: Array<TShift> = []

  schedules.forEach(async (schedule) => {
    const date = new Date(schedule.date)
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
  schedules: Array<TShift>
}

export default function SchedulePage({ schedules }: SchedulePageProps) {
  const dateCellRender = (value: Moment) => {
    const listData = getListData(value, schedules)
    return (
      <ul className={styles.events}>
        {listData?.map((schedule) => (
          <li key={schedule.id}>
            <Schedule data={schedule} />
          </li>
        ))}
      </ul>
    )
  }

  return <Calendar dateCellRender={dateCellRender} />
}

export const getServerSideProps: GetServerSideProps = async () => {
  const schedules = fakeSchedules

  return {
    props: {
      schedules,
    },
  }
}

import { Button, Calendar, Form } from 'antd'
import { Moment } from 'moment'
import { GetServerSideProps } from 'next'
import Schedule from '../../components/Shift'
import axiosApi from '../../services/axiosApi'
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

  const handleSubmited = async () => {
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    try {
      const response = await axiosApi.post('/api/shifts/generate-month', {
        month,
        year,
      })

      const { status, data } = response

      //TODO: show user feedback
      console.log(status, data)
    } catch (error) {
      //TODO: show user feedback (e.g. https://ant.design/components/notification/ )
    }
  }

  return (
    <div>
      <Form onFinish={handleSubmited}>
        <div className={styles.buttonSchedulesGenerate}>
          <Button htmlType="submit">Gerar escalas do mês</Button>
        </div>
      </Form>
      <Calendar dateCellRender={dateCellRender} />
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const schedules = fakeSchedules

  return {
    props: {
      schedules,
    },
  }
}

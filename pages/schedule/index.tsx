import { Button, Calendar, Form } from 'antd'
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

  const handleSubmited = async () => {
    const month = new Date().getMonth()
    const year = new Date().getFullYear()

    const response = await fetch('/api/schedule', {
      method: 'POST',
      body: JSON.stringify({ month, year }),
    })

    response.json()
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

  // const shifts = [
  //   {
  //     startDate: JSON.parse(JSON.stringify(new Date('2022-10-10'))),
  //     endDate: JSON.parse(JSON.stringify(new Date('2022-10-10'))),
  //     idDoctor: 1,
  //     idSector: 91,
  //     isFixed: true,
  //   },
  //   {
  //     startDate: JSON.parse(JSON.stringify(new Date('2022-10-10'))),
  //     endDate: JSON.parse(JSON.stringify(new Date('2022-10-10'))),
  //     idDoctor: 2,
  //     idSector: 92,
  //     isFixed: true,
  //   },
  // ]

  return {
    props: {
      schedules,
    },
  }
}

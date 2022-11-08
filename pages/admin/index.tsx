import { Button, Card, DatePicker, DatePickerProps, Form } from 'antd'
import axiosApi from '../../services/axiosApi'
import styles from './styles.module.css'

export default function Admin() {
  const date: {
    month?: number
    year?: number
  } = {
    month: 0,
    year: 0,
  }

  const onChange: DatePickerProps['onChange'] = (moment) => {
    date.month = moment?.month()
    date.year = moment?.year()
  }

  const generateSchedules = async () => {
    const month = date.month
    const year = date.year

    try {
      const response = await axiosApi.post('/api/shifts/generate-month', {
        month,
        year,
      })

      const { status, data } = response

      //   //TODO: show user feedback
      console.log(status, data)
    } catch (error) {
      //TODO: show user feedback (e.g. https://ant.design/components/notification/ )
    }
  }

  return (
    <div>
      <Card title="Gerar escalas do mês">
        <Form>
          <Form.Item name="month" hasFeedback label="Mês">
            <DatePicker picker="month" onChange={onChange} />
          </Form.Item>
          <Form.Item className={styles.buttonSchedulesGenerate}>
            <Button onClick={generateSchedules} shape="round">
              Gerar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Form,
  notification,
} from 'antd'
import { useState } from 'react'
import axiosApi from '../../services/axiosApi'

import styles from './styles.module.css'

export default function Admin() {
  const [date, setDate] = useState({ month: 0, year: 0 })
  const [isLoading, setIsLoading] = useState(false)

  const onChange: DatePickerProps['onChange'] = (moment) => {
    if (moment) {
      setDate({ month: moment.month(), year: moment.year() })
    }
  }

  const generateSchedules = async () => {
    setIsLoading(true)
    try {
      const response = await axiosApi.post('/api/shifts/generate-month', {
        month: date.month,
        year: date.year,
      })
      setIsLoading(false)

      notification['success']({
        message: 'Escalas geradas!',
        description: response.data,
      })
    } catch (error) {
      notification['error']({
        message: 'Algo deu errado!',
        description: `${error}`,
      })
    }
  }

  return (
    <div>
      <Card title="Gerar escalas do mês" style={{ width: 300 }}>
        <Form>
          <Form.Item name="month" hasFeedback label="Mês">
            <DatePicker picker="month" onChange={onChange} />
          </Form.Item>
          <Form.Item className={styles.buttonSchedulesGenerate}>
            {isLoading ? (
              <Button type="primary" loading shape="round">
                Gerando escalas...
              </Button>
            ) : (
              <Button type="primary" onClick={generateSchedules} shape="round">
                Gerar
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

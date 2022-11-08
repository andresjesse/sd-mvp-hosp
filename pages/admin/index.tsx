import { Button, Card, DatePicker, Form } from 'antd'
import styles from './styles.module.css'

export default function admin() {
  const generateSchedules = async () => {
    // const month = new Date().getMonth()
    // const year = new Date().getFullYear()

    try {
      console.log('works!!')

      //   const response = await axiosApi.post('/api/shifts/generate-month', {
      //     month,
      //     year,
      //   })

      //   const { status, data } = response

      //   //TODO: show user feedback
      //   console.log(status, data)
    } catch (error) {
      //TODO: show user feedback (e.g. https://ant.design/components/notification/ )
    }
  }

  return (
    <div>
      <Card title="Gerar escalas do mês">
        <Form>
          <Form.Item name="month" hasFeedback label="Mês">
            <DatePicker picker="month" />
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

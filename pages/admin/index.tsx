import {
  Button,
  Card,
  DatePicker,
  DatePickerProps,
  Form,
  notification,
  Table,
  Switch,
} from 'antd'
import { useState } from 'react'
import axiosApi from '../../services/axiosApi'
import type { ColumnsType } from 'antd/es/table'
import { GetStaticProps } from 'next'
import { prisma } from '../../lib/prisma'
import { Doctor, User } from '@prisma/client'

interface DataType {
  key: React.Key
  name: string
}

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

      notification['success']({
        message: 'Escalas geradas!',
        description: response.data,
      })
    } catch (error) {
      notification['error']({
        message: 'Algo deu errado!',
        description: `${error}`,
        duration: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Ação',
      dataIndex: 'action',
      render: () => <Switch checked={false} onChange={function () {}} />,
    },
  ]

  const dataDoctor: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
    },
  ]

  return (
    <div>
      <Card title="Gerar escalas do mês">
        <Form>
          <Form.Item name="month" hasFeedback label="Mês">
            <DatePicker
              picker="month"
              onChange={onChange}
              style={{ width: '100%' }}
            />
          </Form.Item>
          <Form.Item>
            {isLoading ? (
              <Button
                type="primary"
                loading
                shape="round"
                style={{ width: '100%' }}
              >
                Gerando escalas...
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={generateSchedules}
                shape="round"
                style={{ width: '100%' }}
              >
                Gerar
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
      <Card title="Ativação de cadastro">
        <Table columns={columns} dataSource={dataDoctor} />
      </Card>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const doctors = await prisma.doctor.findMany({
    select: {
      id: true,
      crm: true,
      crmUf: true,
      isActive: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  })

  return {
    props: {
      doctors,
    },
    revalidate: 10,
  }
}

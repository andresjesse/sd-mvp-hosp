import { Interest } from '@prisma/client'
import { Badge, Calendar, Checkbox, Form, Modal, Radio } from 'antd'
import moment, { Moment } from 'moment'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import { prisma } from '../../lib/prisma'

interface InterestProps {
  interest: Array<Interest>
}

// const onFinish = (values: any) => {
//   console.log('Success:', values)
// }

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

export default function App({ interest }: InterestProps) {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [modalText, setModalText] = useState('')
  const [value, setDate] = useState(() => moment())
  const [selectedDate, setSelectedDate] = useState(() => moment('2017-01-25'))
  const [selectedStatus, setSelectedStatus] = useState(false)
  const [selectedShift, setSelectedShift] = useState('')

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const handleOk = () => {
    setModalText('O interesse será salvo')
    setConfirmLoading(true)
    console.log(
      'medico pela seção',
      `${selectedDate?.format('DD/MM/YY')}`,
      selectedShift,
      selectedStatus
    )
    setTimeout(() => {
      setOpen(false)
      setConfirmLoading(false)
    }, 2000)
  }

  const onSelect = (newValue: Moment) => {
    setSelectedDate(newValue)
    setOpen(true)
  }

  return (
    <>
      <Calendar
        dateCellRender={(value) => {
          for (const key of interest) {
            if (
              new Date(value).getDate() == new Date(key.day).getDate() &&
              new Date(value).getMonth() == new Date(key.day).getMonth() &&
              new Date(value).getFullYear() == new Date(key.day).getFullYear()
            ) {
              if (key.status) {
                if (key.turno == 'dia') {
                  return (
                    <h4>
                      <Badge
                        key={key.id}
                        color={'gold'}
                        text={key.doctor.user.name}
                      />
                    </h4>
                  )
                } else {
                  return (
                    <h4>
                      <Badge
                        key={key.id}
                        color={'purple'}
                        text={key.doctor.user.name}
                      />
                    </h4>
                  )
                }
              } else {
                return (
                  <h4>
                    <Badge
                      key={key.id}
                      color={'red'}
                      text={key.doctor.user.name}
                    />
                  </h4>
                )
              }
            }
          }
        }}
        onSelect={onSelect}
      />
      <Modal
        title="Cadastro de Interesse"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>
          {modalText}
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: false }}
            onFinish={handleOk}
            onReset={handleCancel}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Doctor"
              name="Doctor"
              rules={[{ required: true, message: 'Please input' }]}
            >
              {'NOME DO MÉDICO PELA SESSÃO'}
            </Form.Item>
            <Form.Item
              label="Day"
              name="Day"
              rules={[{ required: true, message: 'Please input' }]}
            >
              {`${selectedDate?.format('DD/MM/YY')}`}
            </Form.Item>
            <Form.Item
              label="Shift"
              rules={[{ required: true, message: 'Please input' }]}
            >
              <Radio.Group onChange={(e) => setSelectedShift(e.target.value)}>
                <Radio value="dia">Dia</Radio>
                <Radio value="noite"> Noite </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="status" name="disabled" valuePropName="checked">
              <Checkbox onChange={(e) => setSelectedStatus(e.target.checked)}>
                Ativo
              </Checkbox>
            </Form.Item>
          </Form>
        </p>
      </Modal>
    </>
  )
}

export const getServerSideProps: GetStaticProps = async () => {
  const interest = await prisma.interest.findMany({
    include: {
      doctor: {
        select: {
          id: true,
          crm: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
    where: {
      idDoctor: {
        equals: 1, //substituir o número 1 pela sessao do medico logado
      },
    },
  })

  console.log(interest)

  return {
    props: {
      interest,
    },
  }
}

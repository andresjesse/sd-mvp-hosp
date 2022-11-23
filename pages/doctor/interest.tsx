import { Interest, Sector } from '@prisma/client'
import {
  Badge,
  Button,
  Calendar,
  Checkbox,
  Form,
  Modal,
  Radio,
  Select,
} from 'antd'
import moment, { Moment } from 'moment'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import SHIFTS from '../../constants/Shifts'
import { prisma } from '../../lib/prisma'
// import createDateUTC from '../../utils/datetime/createDateUTC'

const { Option } = Select

interface InterestProps {
  interests: Array<Interest>
  sectors: Array<Sector>
}

// const onFinish = (values: any) => {
//   console.log('Success:', values)
// }

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

export default function App({ interests, sectors }: InterestProps) {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() => moment('2017-01-25'))
  // const [selectedStatus, setSelectedStatus] = useState(false)
  // const [selectedShift, setSelectedShift] = useState('')

  console.log(interests)

  const handleCancel = () => {
    console.log('Clicked cancel button')
    setOpen(false)
  }

  const handleOk = async (values: any) => {
    setConfirmLoading(true)

    // console.log(
    //   'medico pela seção',
    //   `${selectedDate?.format('DD/MM/YY')}`,
    //   selectedShift,
    //   selectedStatus
    // )
    // setTimeout(() => {
    //   setOpen(false)
    //   setConfirmLoading(false)
    // }, 2000)
  }

  const onSelect = (newValue: Moment) => {
    setSelectedDate(newValue)
    setOpen(true)
  }

  return (
    <>
      <Calendar
        dateCellRender={(value: Moment) => {
          for (const interest of interests) {
            // const startDate = key.startDate

            console.log(interest.startDate)
            console.log(new Date(interest.startDate).getDate())
            console.log(value.date())

            const interestDate = new Date(interest.startDate)

            if (
              value.date() === interestDate.getDate() &&
              value.month() == interestDate.getMonth() &&
              value.year() == interestDate.getFullYear()
              // value.date() == new Date(key.day).getDate() &&
              // value.month() == new Date(key.day).getMonth() &&
              // value.year() == new Date(key.day).getFullYear()
            ) {
              //   if (interest.turno == 'dia') {
              //     return (
              //       <h4>
              //         <Badge
              //           key={interest.id}
              //           color={'gold'}
              //           text={interest.doctor.user.name}
              //         />
              //       </h4>
              //     )
              //   } else {
              //     return (
              //       <h4>
              //         <Badge
              //           key={interest.id}
              //           color={'purple'}
              //           text={interest.doctor.user.name}
              //         />
              //       </h4>
              //     )
              //   }
              // }
              return (
                <h4>
                  <Badge
                    key={interest.id}
                    color={'gold'}
                    text={interest.idDoctor}
                  />
                </h4>
              )
            }
          }
        }}
        onSelect={onSelect}
      />

      <Modal
        title={`Cadastro de Interesse para o dia: ${selectedDate?.format(
          'DD/MM/YY'
        )}`}
        open={open}
        // onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>
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

            <Form.Item label="Início do Turno" name="Shift">
              <Select defaultActiveFirstOption>
                {SHIFTS.map((shift) => {
                  // fixed localtime conversion (see SHIFTS)
                  const startHourLocalTime = shift.START_UTC - 3

                  return (
                    <Option value={shift.START_UTC}>
                      {startHourLocalTime}
                    </Option>
                  )
                })}
              </Select>
            </Form.Item>

            <Form.Item label="Setor" name="Sector">
              <Select defaultActiveFirstOption>
                {sectors.map((sector) => (
                  <Option value={sector.id}>{sector.abbreviation}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </p>
      </Modal>
    </>
  )
}

export const getServerSideProps: GetStaticProps = async () => {
  const interests = await prisma.interest.findMany({
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
        equals: 1, //TODO: replace by doctor logged in id
      },
    },
  })

  const sectors = await prisma.sector.findMany()

  return {
    props: {
      interests: JSON.parse(JSON.stringify(interests)), //next does not serialize objects like prisma Datetime
      sectors,
    },
  }
}

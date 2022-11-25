import { Interest, Sector } from '@prisma/client'
import { Badge, Calendar, Form, message, Modal, Select, Switch } from 'antd'
import moment, { Moment } from 'moment'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import SHIFTS from '../../constants/Shifts'
import { prisma } from '../../lib/prisma'
import axiosApi from '../../services/axiosApi'
import createDateUTC from '../../utils/datetime/createDateUTC'
import { CheckOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'

interface InterestProps {
  interests: Array<Interest>
  sectors: Array<Sector>
}

export default function App({ interests, sectors }: InterestProps) {
  const router = useRouter()
  const [form] = Form.useForm()

  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(() => moment('2017-01-25'))

  // console.log(interests)

  const handleCancel = () => {
    setOpen(false)
  }

  const handleToggleInterest = async (
    idSector: number,
    startUTC: number,
    endUTC: number
  ) => {
    const startDate = createDateUTC(selectedDate.toDate(), startUTC)
    const endDate = createDateUTC(selectedDate.toDate(), endUTC)

    axiosApi
      .post('/api/interest/toggle', {
        idSector,
        startDate,
        endDate,
      })
      .then((res) => {
        if (res.status == 200) {
          message.info('Salvo com sucesso!')
        } else {
          throw new Error(res.statusText)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('Erro ao salvar o interesse! Tente mais tarde.')
      })
      .finally(() => {
        router.push(location.href)
      })
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

            // console.log(interest.startDate)
            // console.log(new Date(interest.startDate).getDate())
            // console.log(value.date())

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
                  <Badge key={interest.id} color={'gold'} text={'Interesse'} />
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
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          labelAlign="left"
          wrapperCol={{ span: 16 }}
        >
          {sectors.map((sector) =>
            SHIFTS.map((shift, index) => {
              // fixed localtime conversion (see SHIFTS)
              const startHourLocalTime = shift.START_UTC - 3
              const endHourLocalTime = (shift.END_UTC - 3) % 24

              let defaultChecked = false

              interests.forEach((i) => {
                const interestStartDate = new Date(i.startDate)
                const interestEndDate = new Date(i.endDate)

                if (
                  interestStartDate.getHours() === startHourLocalTime &&
                  interestEndDate.getHours() === endHourLocalTime &&
                  i.idSector === sector.id
                ) {
                  defaultChecked = true
                }
              })

              return (
                <Form.Item
                  key={sector.abbreviation + index}
                  label={`${sector.abbreviation}: ${startHourLocalTime} às ${endHourLocalTime}`}
                >
                  <Switch
                    checkedChildren={<CheckOutlined />}
                    defaultChecked={defaultChecked}
                    onChange={() =>
                      handleToggleInterest(
                        sector.id,
                        shift.START_UTC,
                        shift.END_UTC
                      )
                    }
                  />
                </Form.Item>
              )
            })
          )}
        </Form>
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

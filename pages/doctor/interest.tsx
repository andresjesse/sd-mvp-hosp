import { Interest, Sector } from '@prisma/client'
import { Badge, Calendar, Form, message, Modal, Select, Switch } from 'antd'
import moment, { Moment } from 'moment'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import SHIFTS from '../../constants/Shifts'
import { prisma } from '../../lib/prisma'
import axiosApi from '../../services/axiosApi'
import createDateUTC from '../../utils/datetime/createDateUTC'

import { useRouter } from 'next/router'
import InterestsModal from '../../components/InterestsModal'
import isSameDay from '../../utils/datetime/isSameDay'

interface InterestProps {
  interests: Array<Interest>
  sectors: Array<Sector>
}

export default function App({ interests, sectors }: InterestProps) {
  // const [confirmLoading, setConfirmLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)

  // console.log(interests)

  const onSelect = (newValue: Moment) => {
    setSelectedDate(newValue)
  }

  const onCancelModal = () => {
    setSelectedDate(null)
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
              // value.date() === interestDate.getDate() &&
              // value.month() == interestDate.getMonth() &&
              // value.year() == interestDate.getFullYear()

              isSameDay(value.toDate(), interestDate)

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

      <InterestsModal
        interests={interests}
        sectors={sectors}
        selectedDate={selectedDate}
        onCloseModal={() => setSelectedDate(null)}
      />
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

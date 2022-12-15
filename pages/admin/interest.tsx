import { Doctor, Interest, Sector, User } from '@prisma/client'
import { Badge, Calendar, Tag, Tooltip } from 'antd'
import { Moment } from 'moment'
import { GetStaticProps } from 'next'
import { useState } from 'react'
import { prisma } from '../../lib/prisma'

import InterestsModal from '../../components/Admin/InterestModalAdmin'
import isSameDay from '../../utils/datetime/isSameDay'
import styles from './styles.module.css'

interface InterestProps {
  interests: Array<Interest>
  sectors: Array<Sector>
  doctors: Array<Doctor>
  user: Array<User>
}

export default function App({
  interests,
  sectors,
  doctors,
  user,
}: InterestProps) {
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null)

  const onSelect = (newValue: Moment) => {
    setSelectedDate(newValue)
  }

  const onCloseModal = () => {
    setSelectedDate(null)
  }

  const renderCell = (calendarDate: Moment) => {
    return interests
      .filter((interest) =>
        isSameDay(new Date(interest.startDate), calendarDate.toDate())
      )
      .map((fileredInterest) => {
        const sector = sectors.find((s) => s.id == fileredInterest.idSector)

        const doctor = doctors.find((d) => d.id == fileredInterest.idDoctor)

        const users = user.find((u) => u.id == doctor?.userId)

        // UI in localtime (getHours instead of getUTCHours)
        const start = new Date(fileredInterest.startDate).getHours()
        const end = new Date(fileredInterest.endDate).getHours()

        const text = `${sector?.abbreviation} - ${start} às ${end} - ${users?.name}`

        return (
          <div>
            <Tooltip title={text}>
              <Tag className={styles.tag} color={'blue'}>
                {text}
              </Tag>
            </Tooltip>
          </div>
        )
      })
  }

  return (
    <>
      <Calendar dateCellRender={renderCell} onSelect={onSelect} />

      <InterestsModal
        interests={interests}
        sectors={sectors}
        doctors={doctors}
        users={user}
        selectedDate={selectedDate}
        onCloseModal={onCloseModal}
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
    /*where: {
      idDoctor: {
        equals: 1, //TODO: replace by doctor logged in id
      },
    },*/ //all doctors
  })

  const sectors = await prisma.sector.findMany()
  const doctor = await prisma.doctor.findMany()
  const user = await prisma.user.findMany()

  return {
    props: {
      interests: JSON.parse(JSON.stringify(interests)), //next does not serialize objects like prisma Datetime
      sectors,
      doctors: JSON.parse(JSON.stringify(doctor)),
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}

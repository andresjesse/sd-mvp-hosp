import { Interest, Sector } from '@prisma/client'
import { Calendar, Tag, Tooltip } from 'antd'
import { Moment } from 'moment'
import { GetServerSidePropsContext } from 'next'
import { useState } from 'react'
import { prisma } from '../../lib/prisma'

import InterestsModal from '../../components/InterestsModal'
import withAuth from '../../utils/auth/withAuth'
import isSameDay from '../../utils/datetime/isSameDay'
import { TSessionUser } from '../api/auth/[...nextauth]'
import styles from './styles.module.css'

interface InterestProps {
  interests: Array<Interest>
  sectors: Array<Sector>
}

export default function App({ interests, sectors }: InterestProps) {
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
      .map((fileredInterest, index) => {
        const sector = sectors.find((s) => s.id == fileredInterest.idSector)

        // UI in localtime (getHours instead of getUTCHours)
        const start = new Date(fileredInterest.startDate).getHours()
        const end = new Date(fileredInterest.endDate).getHours()

        const text = `${sector?.abbreviation} - ${start} às ${end}`

        return (
          <div key={index}>
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
        selectedDate={selectedDate}
        onCloseModal={onCloseModal}
      />
    </>
  )
}

// export const getServerSideProps: GetStaticProps = async () => {
export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext, user: TSessionUser) => {
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
          equals: user.doctor?.id,
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
)

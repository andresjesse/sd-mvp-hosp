import { prisma } from './../../lib/prisma'
import { Doctor, Sector, Shift, User } from '@prisma/client'
import { Calendar, Space, Switch, Tag } from 'antd'
import { Moment } from 'moment'
import { GetServerSidePropsContext } from 'next'
import ScheduleCell from '../../components/ScheduleCell'
import withAuth from '../../utils/auth/withAuth'
import { TSessionUser } from '../api/auth/[...nextauth]'
import { useState } from 'react'
import styles from './styles.module.css'

export type CompositeShift = Shift & {
  doctor:
    | (Doctor & {
        user: User
      })
    | null
  sector: Sector
}

export type CompositeDoctor = Doctor & {
  user: User
}

interface SchedulePageProps {
  shifts: Array<CompositeShift>
  doctors: Array<CompositeDoctor>
  user: TSessionUser
}

const getListData = (value: Moment, shifts: Array<CompositeShift>) => {
  const listData: Array<CompositeShift> = []

  shifts.forEach(async (shift) => {
    const date = new Date(shift.startDate)
    if (
      date.getDate() == value.date() &&
      date.getMonth() == value.month() &&
      date.getFullYear() == value.year()
    ) {
      listData.push(shift)
    }
  })

  return listData
}

export default function SchedulePage({
  shifts,
  doctors,
  user,
}: SchedulePageProps) {
  const [showAllShifts, setShowAllShifts] = useState(true)

  const dateCellRender = (value: Moment) => {
    const shiftsToShow = showAllShifts
      ? shifts
      : shifts.filter((shift) => {
          return shift.idDoctor === user.doctor?.id
        })

    const listData = getListData(value, shiftsToShow)

    return (
      <div>
        <ScheduleCell shifts={listData} doctors={doctors} user={user} />
      </div>
    )
  }

  return (
    <div>
      {user.doctor ? (
        <div className={styles.switchContainer}>
          <p>Ver todas as escalas?</p>
          <Switch
            defaultChecked
            checkedChildren="Sim"
            unCheckedChildren="Não"
            onChange={() => {
              setShowAllShifts(!showAllShifts)
            }}
          />
        </div>
      ) : (
        <></>
      )}

      <div className={styles.labelsContainer}>
        <Space wrap>
          <Tag className={styles.tag} color={'blue'}>
            Fixo preenchido
          </Tag>
          <Tag className={styles.tag} color={'rgb(139, 214, 224)'}>
            Fixo vago
          </Tag>
          <Tag className={styles.tag} color={'green'}>
            Não fixo preenchido
          </Tag>
          <Tag className={styles.tag} color={'lightgrey'}>
            Não fixo vago
          </Tag>
        </Space>
      </div>

      <Calendar dateCellRender={dateCellRender} />
    </div>
  )
}

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext, user: TSessionUser) => {
    const shifts = await prisma.shift.findMany({
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
        sector: true,
      },
    })

    const doctors = await prisma.doctor.findMany({
      include: {
        user: true,
      },
    })

    return {
      props: {
        shifts: JSON.parse(JSON.stringify(shifts)), //next does not serialize objects like prisma Datetime
        doctors: JSON.parse(JSON.stringify(doctors)), //next does not serialize objects like prisma Datetime
        user,
      },
    }
  }
)

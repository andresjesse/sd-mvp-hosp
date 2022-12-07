import { prisma } from './../../lib/prisma'
import { Doctor, Sector, Shift, User } from '@prisma/client'
import { Calendar, Switch } from 'antd'
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
  sessionUserShifts: Array<CompositeShift>
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
  sessionUserShifts,
  doctors,
  user,
}: SchedulePageProps) {
  const [showAllShifts, setShowAllShifts] = useState(false)

  const dateCellRender = (value: Moment) => {
    const shiftsToShow = showAllShifts ? shifts : sessionUserShifts
    const listData = getListData(value, shiftsToShow)
    return (
      <div>
        <ScheduleCell shifts={listData} doctors={doctors} />
      </div>
    )
  }

  return (
    <div>
      {user.admin ? (
        // TO-DO add styling to switch button
        <div className={styles.switch}>
          <p>Ver todas as escalas?</p>
          <Switch
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

    const sessionUserShifts = shifts.filter((shift) => {
      return shift.idDoctor === user.id
    })

    const doctors = await prisma.doctor.findMany({
      include: {
        user: true,
      },
    })

    return {
      props: {
        shifts: JSON.parse(JSON.stringify(shifts)), //next does not serialize objects like prisma Datetime
        sessionUserShifts: JSON.parse(JSON.stringify(sessionUserShifts)), //next does not serialize objects like prisma Datetime
        doctors: JSON.parse(JSON.stringify(doctors)), //next does not serialize objects like prisma Datetime
        user,
      },
    }
  }
)

import { Doctor, User } from '@prisma/client'
import { GetStaticProps } from 'next'
import DoctorActivationCard from '../../components/Admin/DoctorActivationCard'
import GenerateMonthScheduleCard from '../../components/Admin/GenerateMonthScheduleCard'
import { prisma } from '../../lib/prisma'

interface AdminProps {
  doctors: Array<Doctor & { user: User }>
}

export default function Admin({ doctors }: AdminProps) {
  return (
    <>
      <GenerateMonthScheduleCard />
      <DoctorActivationCard doctors={doctors} />
    </>
  )
}

export const getServerSideProps: GetStaticProps = async () => {
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
  }
}

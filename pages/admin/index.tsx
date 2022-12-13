import { Doctor, User } from '@prisma/client'
import { Card } from 'antd'
import { GetStaticProps } from 'next'
import Link from 'next/link'
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
      <Card title="Visualizar Interesses">
        <Link href="/admin/interest">Acesso via Perspectiva do Admin</Link>
      </Card>
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

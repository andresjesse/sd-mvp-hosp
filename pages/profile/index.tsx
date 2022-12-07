import { Button, Typography } from 'antd'

import Link from 'next/link'
import styles from './styles.module.css'
const { Title, Text } = Typography
import { GetServerSidePropsContext } from 'next'
import { SelectOutlined } from '@ant-design/icons'
import { prisma } from '../../lib/prisma'
import { Doctor } from '@prisma/client'
import withAuth from '../../utils/auth/withAuth'
import { TSessionUser } from '../api/auth/[...nextauth]'

interface ProfilePageProps {
  doctor: Doctor
  user: TSessionUser
}

const renderField = (label: string, value: string) => {
  return (
    <>
      <Title level={5}>
        <b>{label}:</b>
      </Title>
      <Text>{value}</Text>
    </>
  )
}

export default function ProfilePage({ doctor, user }: ProfilePageProps) {
  return (
    <div className={styles.authPageWrapper}>
      <div className={styles.formContainer}>
        <Title className={styles.textCenter} level={2}>
          Meu Perfil
        </Title>

        {renderField('Nome', user.name)}

        {renderField('Email', user.email)}

        {doctor && renderField('CRM', doctor.crm)}

        {doctor && renderField('CRM UF', doctor.crmUf)}

        <Link href="profile/edit">
          <Button
            className={styles.button}
            shape="round"
            icon={<SelectOutlined />}
            disabled={false}
            size="large"
          >
            Editar Perfil
          </Button>
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps = withAuth(
  async (ctx: GetServerSidePropsContext, user: TSessionUser) => {
    const doctor = await prisma.doctor.findUnique({
      where: {
        id: user.id,
      },
      include: {
        user: true,
      },
    })

    return {
      props: {
        doctor: JSON.parse(JSON.stringify(doctor)),
        user,
      },
    }
  }
)

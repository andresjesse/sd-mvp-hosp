import { Form, Input, Button, Typography } from 'antd'

import Link from 'next/link'
import styles from './styles.module.css'
const { Title } = Typography
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

export default function ProfilePage({ doctor, user }: ProfilePageProps) {
  return (
    <div className={styles.authPageWrapper}>
      <div className={styles.formContainer}>
        <Form
          name="formNew"
          //layout="horizontal"
          disabled={true}
        >
          <Title className={styles.textCenter} level={2}>
            Meu Perfil
          </Title>

          <Form.Item
            name="name"
            label="Nome: "
            initialValue={user.name}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input id="name" size="large" />
          </Form.Item>
          <Form.Item
            name="crm"
            label="CRM: "
            initialValue={doctor?.crm}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input id="crm" size="large" />
          </Form.Item>
          <Form.Item
            name="crmUf"
            label="CRM UF: "
            initialValue={doctor?.crmUf}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input id="crmUf" size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email: "
            initialValue={user.email}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input id="email" size="large" />
          </Form.Item>
          <Button
            className={styles.button}
            shape="round"
            icon={<SelectOutlined />}
            disabled={false}
            size="large"
          >
            <Link href="profile/edit"> Editar Perfil</Link>
          </Button>
        </Form>
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

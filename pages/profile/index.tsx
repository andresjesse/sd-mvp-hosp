import { Form, Input, Button, Select, Typography } from 'antd'
import router from 'next/router'
import { useState } from 'react'
import axiosApi from '../../services/axiosApi'
import Link from 'next/link'
import { fakeCrmUf } from '../../services/fakeCrmUf'
import styles from './styles.module.css'
const { Title, Text } = Typography
import { GetServerSideProps } from 'next'
import { SelectOutlined } from '@ant-design/icons'
import { prisma } from '../../lib/prisma'

type ProfileSummary = {
  name: String
  crm: String
  crmUf: String
  email: String
}

interface ProfilePageProps {
  data: ProfileSummary
}

export default function ProfilePage({ data }: ProfilePageProps) {
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
            initialValue={data.name}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input id="name" size="large" />
          </Form.Item>
          <Form.Item
            name="crm"
            label="CRM: "
            initialValue={data.crm}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input id="crm" size="large" />
          </Form.Item>
          <Form.Item
            name="crmUf"
            label="CRM UF: "
            initialValue={data.crmUf}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input id="crmUf" size="large" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email: "
            initialValue={data.email}
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

export const getServerSideProps: GetServerSideProps = async () => {
  const id = 2

  const selectedUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  })

  const selectedDoctor = await prisma.doctor.findUnique({
    where: {
      id: id,
    },
  })

  console.log(selectedUser?.name)

  let profile: ProfileSummary = {
    //Como resolver isso?
    name: selectedUser?.name,
    crm: selectedDoctor?.crm,
    crmUf: selectedDoctor?.crmUf,
    email: selectedUser?.email,
  }

  return {
    props: { data: profile },
  }
}

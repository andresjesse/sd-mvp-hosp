import { Form, Input, Button, notification, Typography, Select } from 'antd'

import router from 'next/router'
import { useState } from 'react'
import styles from './styles.module.css'
const { Title, Text } = Typography
import { GetServerSidePropsContext } from 'next'
import { SelectOutlined } from '@ant-design/icons'
import { prisma } from '../../../lib/prisma'
import { Doctor } from '@prisma/client'
import withAuth from '../../../utils/auth/withAuth'
import { TSessionUser } from '../../api/auth/[...nextauth]'
import axiosApi from '../../../services/axiosApi'
import { fakeCrmUf } from '../../../services/fakeCrmUf'

interface ProfilePageProps {
  doctor: Doctor
  user: TSessionUser
}

const initialObjError = {
  name: '',
  email: '',
  password: '',
  crm: '',
  crmUf: '',
}

export default function ProfilePage({ doctor, user }: ProfilePageProps) {
  const [form] = Form.useForm()
  const [objError, setObjError] = useState(initialObjError)

  const handleUpdate = (values: { [key: string]: string }) => {
    axiosApi
      .post('/api/profile/edit', {
        name: values.name,
        email: values.email,
        password: values.password,
        crm: values.crm,
        crmUf: values.crmUf,
      })
      .then((response) => {
        if (response.status == 200) {
          notification.open({
            message: 'Perfil atualizado com sucesso!',
            //description: 'Você pode fazer login agora.',
            duration: 0,
          })
          router.push('/profile')
        } else {
          notification.open({
            message: 'Erro ao atualizar perfi!!',
            description: 'Entre em contato com o suporte.',
            duration: 0,
          })
        }
      })
      .catch((e) => {
        if (e.response.data.data) {
          setObjError(e.response.data.data)
          return
        }
      })
  }

  return (
    <div className={styles.authPageWrapper}>
      <div className={styles.formContainer}>
        <Form
          form={form}
          name="formUpdate"
          onFinish={handleUpdate}
          //layout="horizontal"
          // disabled={true}
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
            <Select
              //onChange={(uf) => {
              //  setValor({ ...formValue, ['crmUf']: uf })
              //}}
              className={styles.formBorderRadius}
            >
              {fakeCrmUf.map((uf) => (
                <Select.Option key={uf} value={uf}>
                  {uf}
                </Select.Option>
              ))}
            </Select>
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
          <Form.Item
            name="password"
            label="Senha: "
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Input.Password id="password" size="large" />
          </Form.Item>
          {objError && (
            <Text type="danger">
              {objError.name ||
                objError.crm ||
                objError.crmUf ||
                objError.email}
            </Text>
          )}
          <Button
            className={styles.button}
            shape="round"
            icon={<SelectOutlined />}
            disabled={false}
            size="large"
            type="primary"
            htmlType="submit"
            //onClick={handleUpdate}
          >
            Salvar
            {/* <Link href="profile/edit"> Editar Perfil</Link> */}
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
        userId: user.id,
      },
      include: {
        user: true,
      },
    })
    const newUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    })

    return {
      props: {
        doctor: JSON.parse(JSON.stringify(doctor)),
        user: JSON.parse(JSON.stringify(newUser)),
      },
    }
  }
)

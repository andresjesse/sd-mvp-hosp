import { Role } from '@prisma/client'
import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Typography,
} from 'antd'
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next'

import React from 'react'

import { fakeCrmUf } from '../../services/fakeCrmUf'
import { hasRoleCheck } from '../../utils/auth/authorizationHelper'

const { Title } = Typography
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

const App: React.FC = () => {
  return (
    <Card>
      <Row justify="center">
        <Title level={3}>Cadastro Novo usuario</Title>
      </Row>

      <Row justify="center" style={{ padding: '5%' }}>
        <Form
          layout="horizontal"
          labelWrap
          labelCol={{ flex: '120px' }}
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ width: '100%' }}
        >
          <Form.Item label="Nome: ">
            <Input name="nameDoctor" />
          </Form.Item>

          <Form.Item label="Sobrenome: ">
            <Input name="lastNameDoctor" />
          </Form.Item>

          <Form.Item label="Data de Nascimento: ">
            <DatePicker format={dateFormatList[0]} />
          </Form.Item>

          <Form.Item label="CRM: ">
            <Input name="crm" />
          </Form.Item>

          {/**fazer a fake uf's */}
          <Form.Item label="CRM UF: ">
            <Select>
              {fakeCrmUf.map((uf) => (
                <Select.Option key={uf} value={uf}>
                  {uf}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Email: ">
            <Input name="email" alt="Seu E-mail" />
          </Form.Item>

          <Form.Item label="Confirme o Email: ">
            <Input name="confEmail" alt="Confirme seu E-mail" />
          </Form.Item>

          <Form.Item label="Senha: ">
            <Input name="password" alt="Senha" />
          </Form.Item>

          <Form.Item label="Confirme sua Senha: ">
            <Input name="confPassword" alt="Confirme a Senha" />
          </Form.Item>

          <Form.Item label=" ">
            <Button type="primary" htmlType="submit">
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Card>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const req = context.req as NextApiRequest
  const res = context.res as NextApiResponse
  const authorizationResponse = await hasRoleCheck(req, res, Role.ADMIN)

  return {
    props: {}, // will be passed to the page component as props
  }
}

export default App

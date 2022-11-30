import { Button, Form, Input, notification, Select, Typography } from 'antd'
import router from 'next/router'
import { useState } from 'react'
import axiosApi from '../../services/axiosApi'
import { fakeCrmUf } from '../../services/fakeCrmUf'
import styles from './styles.module.css'
const { Title, Text } = Typography

const initialValues = {
  name: '',
  crm: '',
  crmUf: '',
  email: '',
  password: '',
}

const initialObjError = {
  name: '',
  email: '',
  password: '',
  crm: '',
  crmUf: '',
}

const Profile: React.FC = () => {
  const [formValue, setValor] = useState(initialValues)
  const [objError, setObjError] = useState(initialObjError)

  function handleChange(event: { target: { id: string; value: string } }) {
    const { id, value } = event.target
    setValor({ ...formValue, [id]: value })
  }

  function handleSubmit(req: object) {
    axiosApi
      .post('/api/doctor/create', req)
      .then((response) => {
        if (response.status == 201) {
          notification.open({
            message: 'Usuário criado com sucesso!',
            description: 'Você pode fazer login agora.',
            duration: 0,
          })
          router.push('/login')
        } else {
          notification.open({
            message: 'Erro ao criar usuário!',
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
          name="formNew"
          layout="horizontal"
          disabled={true}
          labelWrap
          labelCol={{ flex: '120px' }}
          // wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ width: '100%' }}
          onFinish={() => {
            handleSubmit(formValue)
          }}
          scrollToFirstError
        >
          <Title className={styles.textCenter} level={3}>
            Meu Perfil
          </Title>

          <Form.Item
            name="name"
            label="Nome: "
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor insira seu Nome!',
                whitespace: true,
              },
            ]}
          >
            <Input id="name" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="crm"
            label="CRM: "
            hasFeedback
            rules={[{ required: true, message: 'Por favor insira seu CRM!' }]}
          >
            <Input id="crm" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="crmUf"
            label="CRM UF: "
            hasFeedback
            rules={[
              { required: true, message: 'Por favor insira seu CRM-UF!' },
            ]}
          >
            <Select
              onChange={(uf) => {
                setValor({ ...formValue, ['crmUf']: uf })
              }}
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
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor insira seu e-mail.',
              },
              {
                type: 'email',
                message: 'E-mail invalido.',
              },
            ]}
          >
            <Input id="email" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Confirme o Email: "
            name="confEmail"
            dependencies={['email']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor confirme seu E-mail!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('email') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Os E-mail não são iguais!'))
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha: "
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor insira sua senha.',
              },
            ]}
          >
            <Input.Password id="password" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="confPassword"
            label="Confirme sua Senha: "
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Por favor confirme sua senha!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('As senhas não são iguais!'))
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          {objError && (
            <Text type="danger">
              {objError.name ||
                objError.crm ||
                objError.crmUf ||
                objError.email ||
                objError.password}
            </Text>
          )}

          <Form.Item label=" ">
            <Button
              className={styles.button}
              shape="round"
              size="large"
              type="primary"
              htmlType="submit"
            >
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Profile

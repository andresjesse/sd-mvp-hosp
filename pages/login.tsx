import { LoginOutlined, SelectOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { useEffect, useState } from 'react'
import login from '../styles/login.module.css'
const { Title, Text } = Typography

const Login: React.FC = () => {
  const router = useRouter()

  const [form] = Form.useForm()

  const [error, setError] = useState('')
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    form.setFieldValue('email', localStorage.getItem('email') || '')
  }, [form])

  const onFinish = async (values: { [key: string]: string }) => {
    const email: string = values.email
    const password: string = values.password

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      console.log(res)
      setError(res.error)
      return
    }

    console.log(res)

    localStorage.setItem('email', checked ? form.getFieldValue('email') : '')

    const callbackUrl = router.query.callbackUrl
    const redirectUrl = callbackUrl === undefined ? '/welcome' : callbackUrl
    await router.push(redirectUrl as string)
  }

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<{
      [key: string]: string
    }>
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className={login.authPageWrapper}>
      <div className={login.formContainer}>
        <Form
          form={form}
          name="singin"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Title level={2} className={login.texCenter}>
            Login
          </Title>

          <Form.Item
            hasFeedback
            name="email"
            label="E-mail"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
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
            <Input placeholder="E-mail" size="large" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Por favor insira sua senha.',
              },
              // {
              //   min: 6,
              //   message: 'A senha deve conter no minimo 8 caracteres.',
              // },
            ]}
          >
            <Input.Password placeholder="Senha" size="large" />
          </Form.Item>

          <Form.Item>
            <Form.Item valuePropName="checked" noStyle>
              <Checkbox
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked)
                }}
              >
                Lembre-me
              </Checkbox>
            </Form.Item>

            {/* <a className={login.forgotRight} href="#">
              Esqueceu a senha?
            </a> */}
          </Form.Item>

          {error && <Text type="danger">{error}</Text>}

          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            icon={<LoginOutlined />}
            size="large"
            className={login.button}
          >
            Login
          </Button>

          <Button
            className={login.button}
            shape="round"
            icon={<SelectOutlined />}
            size="large"
          >
            <Link href="user/new"> Criar uma conta</Link>
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login

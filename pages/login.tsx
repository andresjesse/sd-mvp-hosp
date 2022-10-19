import { LoginOutlined, SelectOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { Router } from 'next/router'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import React, { useState } from 'react'
const { Title } = Typography

const App: React.FC = () => {
  const [error, setError] = useState('')

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
    await Router.push('/welcome')
  }

  const onFinishFailed = (
    errorInfo: ValidateErrorEntity<{
      [key: string]: string
    }>
  ) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="auth-page-wrapper">
      <div className="form-container sign-in-container">
        <Form
          name="singin"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Title level={2} className="text-center">
            Login
          </Title>

          <Form.Item
            name="email"
            hasFeedback
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
            name="password"
            hasFeedback
            label="Senha"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[
              {
                required: true,
                message: 'Por favor insira sua senha.',
              },
              {
                min: 6,
                message: 'A senha deve conter no minimo 8 caracteres.',
              },
            ]}
          >
            <Input.Password placeholder="Senha" size="large" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lembre-me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot-right" href="#">
              Esqueceu a senha?
            </a>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            shape="round"
            icon={<LoginOutlined />}
            size="large"
          >
            Login
          </Button>

          <Button shape="round" icon={<SelectOutlined />} size="large">
            <Link href="user/new"> Criar uma conta</Link>
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default App

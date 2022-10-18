import { Button, Form, Input } from 'antd'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import Router from 'next/router'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import React, { useState } from 'react'

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
    /* tag <Card> aqui*/
    <Form
      className="formCenter"
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          { required: true, message: 'Insira um email válido!', type: 'email' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Senha"
        name="password"
        rules={[{ required: true, message: 'Preencha sua senha!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox disabled>Lembrar</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Link href="/">Esquecia a senha</Link>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export default App

{
  /*

*to do
*disabled esqueci senha
* usar o login na pagina inteira 
 */
}

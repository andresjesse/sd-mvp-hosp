import { LoginOutlined, SelectOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Typography } from 'antd'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'
import { useState } from 'react'
import login from '../styles/login.module.css'
const { Title, Text } = Typography

const Login: React.FC = () => {

  const router = useRouter();
  const [error, setError] = useState('');

  /*CHECK LEMBREME EM OBRA */
/*
  const [emailStorage, setEmailStorage] = useState('');
  const [passwordStorage, setPasswordStorage] = useState('');

 useEffect(() => {

    //localStorage.setItem('email', 'email@teste.com');
    //localStorage.setItem('pass', 'testepass');
    console.log("useEffect rodando...")

    let x: unknown = localStorage.getItem('email');
    //let y: unknown = localStorage.getItem('pass');

    setEmailStorage(x as string)

    console.log("setou x... ", x)

  }, [])


  function handleChange(e: { target: { value: any } }){
    setEmailStorage(e.target.value)
  }
  */
  /*^^^^CHECK LEMBREME EM OBRA */


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
    await router.push('/welcome')
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
          name="singin"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Title level={2} className={login.texCenter}>
            Login
          </Title>
          
          <Form.Item
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
            <Input autoFocus id="email" name="email" placeholder="E-mail" /* value={emailStorage} onChange={handleChange}*/ size="large" />
          </Form.Item>

          <Form.Item
            hasFeedback
            label="Senha"
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
            <Input.Password id="password" name="password" placeholder="Senha" size="large" />
          </Form.Item>

          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Lembre-me</Checkbox>
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

          <Button className={login.button} shape="round" icon={<SelectOutlined />} size="large">
            <Link href="user/new"> Criar uma conta</Link>
          </Button>
        </Form>
      </div>
    </div>
  )
}

export default Login

import { Button, Form, Input, Select, Typography } from 'antd'
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

const New: React.FC = () => {
  const [formValue, setValor] = useState(initialValues)
  const [objError, setObjError] = useState(initialObjError)

  function handleChange(event: { target: { id: string; value: string } }) {
    const { id, value } = event.target
    setValor({ ...formValue, [id]: value })    
  }

  function handleSubmit(req: object) {
    axiosApi
      .post('/api/doctor/create', req)
      .then((response) => router.push('/welcome'))
      .catch((e) => {
        if(e.response.data.data){
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
          labelWrap
          labelCol={{ flex: '120px' }}
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ width: '100%' }}
          onFinish={()=>{handleSubmit(formValue)}}
          scrollToFirstError
        >
          <Title className={styles.textCenter} level={3}>
            Cadastro Novo Usuario
          </Title>

          <Form.Item
            name="name"
            label="Nome: "    
            hasFeedback
             rules={[{ required: true, message: 'Por favor insira seu Nome!',  whitespace: true }]}
            >
            <Input id="name" onChange={handleChange} />
          </Form.Item>

          {/*DATA DE NASCIMENTO DESATIVADA PARA FUTURA IMPLANTAÇÃO*/}
          {/*<Form.Item label="Data de Nascimento: ">
                <DatePicker onChange={(date) => {
                  setValor({...formValue, ['birthday']: moment(date).format(dateFormat)});
                }} id="birthday" name="birthday" className={styles.formBorderRadius} format={dateFormat} />
              </Form.Item>*/}

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
            rules={[{ required: true, message: 'Por favor insira seu CRM-UF!' }]}
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
                   return Promise.reject(
                     new Error('Os E-mail não são iguais!')
                   )
                 },
               }),
             ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            name="password"
            label="Senha: "
            rules={[
              {
                required: true,
                message: 'Por favor insira sua senha.',
              },
            ]}
            hasFeedback
            >
            <Input.Password id="password" onChange={handleChange}/>
          </Form.Item>

          <Form.Item 
            name="confPassword"
            label="Confirme sua Senha: "
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: 'Por favor confirme sua senha!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('As senhas não são iguais!'));
                },
              }),
            ]}
            hasFeedback
            >
            <Input.Password/>
          </Form.Item>

          {objError && <Text type="danger">{objError.name || objError.crm || objError.crmUf || objError.email || objError.password}</Text>}

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

export default New

import {
  Button, DatePicker,
  Form,
  Input, Select,
  Typography
} from 'antd'

import React from 'react'

import { fakeCrmUf } from '../../services/fakeCrmUf'
import newStyles from './new.module.css'



const { Title } = Typography
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

const App: React.FC = () => {
  return (

    <div className={newStyles.authPageWrapper}>
      <div className={newStyles.formContainer}>
        <Form
            layout="horizontal"
            labelWrap
            labelCol={{ flex: '120px' }}
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ width: '100%' }}
          >
          <Title className={newStyles.textCenter} level={3}>Cadastro Novo Usuario</Title>

            <Form.Item label="Nome: ">
              <Input name="nameDoctor" />
            </Form.Item>

            <Form.Item label="Data de Nascimento: ">
              <DatePicker className={newStyles.formBorderRadius} format={dateFormatList[0]} />
            </Form.Item>

            <Form.Item label="CRM: ">
              <Input name="crm" />
            </Form.Item>

            <Form.Item label="CRM UF: ">
              <Select className={newStyles.formBorderRadius}>
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
              <Button className={newStyles.button} shape="round" size="large" type="primary" htmlType="submit">
                Cadastrar
              </Button>
            </Form.Item>
          </Form>
      </div>
    </div>
  )
}

export default App

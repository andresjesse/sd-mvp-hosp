import { Button, Form, Input, Select, Typography } from 'antd'
import router from 'next/router'
import { useState } from 'react'
import axiosApi from '../../services/axiosApi'
import { fakeCrmUf } from '../../services/fakeCrmUf'
const { Title } = Typography

import styles from './styles.module.css'

const initialValues = {
  nameDoctor: '',
  crm: '',
  crmUf: '',
  email: '',
  confEmail: '',
  password: '',
  confPassword: '',
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

  function handleChange(event: { target: { name: string; value: string } }) {
    const { name, value } = event.target
    setValor({ ...formValue, [name]: value })
  }

  function handleSubmit(req: object) {
    axiosApi
      .post('/api/doctor/create', req)
      //.then((response) => setObjError(response.data))
      .then((response) => router.push('/welcome'))
      .catch((e) => {
        //console.log(e, e.response.data.data)
        setObjError(e.response.data.data)

        //TENTATIVA DE PEGAR O NAME DO ERRO E COMPARAR COM O OBJETO STATUSERRO E INTERAGIR COM HTML CONFORME O ERRO.
        /*if(e.response.data.data != null){
          let aux = e.response.data.data;
          console.log("deu erro....", );
        }*/
      })
  }

  //FAZER VALIDAÇÃO ANTES DE MANDAR PARA SERVIDOR.
  function validete() {
    console.log('validando...')

    let aux = {
      name: formValue.nameDoctor,
      email: formValue.email,
      password: formValue.password,
      crm: formValue.crm,
      crmUf: formValue.crmUf,
    }

    /*
    let aux = {
      name: '',
      email: '',
      password: '',
      crm: '',
      crmUf: '',
    }

    let counterros = false;

    if(!formValue.nameDoctor){
      setObjError({...objError, name: 'Nome não pode ser vazio!'})
    }else{
      setObjError({...objError, name: ''})
      aux.name = formValue.nameDoctor
    }

    //verifcar esta passando com valor null
    if(!formValue.crm){
      setObjError({...objError, crm: 'CRM não pode ser vazio!'})
    }else{
      setObjError({...objError, crm: ''})
      aux.crm = formValue.crm
    }

    if(!formValue.crmUf){
      setObjError({...objError, crmUf: 'CRM UF não pode ser vazio!'})
    }else{
      setObjError({...objError, crmUf: ''})
      aux.crmUf = formValue.crmUf
    }

    if(formValue.email != formValue.confEmail){
      setObjError({...objError, email: 'Email não são iguais!'})
    }else{
      setObjError({...objError, email: ''})
    }

    if(!formValue.email){
      setObjError({...objError, email: 'Email não pode ser vazio!'})
    }else{
      setObjError({...objError, email: ''})
      aux.email = formValue.email
    }

    if(formValue.password != formValue.confPassword){
      setObjError({...objError, password: 'Senha não são iguais!'})
    }else{
      setObjError({...objError, password: ''})
    }

    if(!formValue.password){
      setObjError({...objError, password: 'Senha não pode ser vazio!'})
    }else{
      setObjError({...objError, password: ''})
      aux.password = formValue.password
    }*/

    console.log('validado!')
    handleSubmit(aux)
  }

  return (
    <div className={styles.authPageWrapper}>
      <div className={styles.formContainer}>
        <Form
          layout="horizontal"
          labelWrap
          labelCol={{ flex: '120px' }}
          wrapperCol={{ flex: 1 }}
          colon={false}
          style={{ width: '100%' }}
          onFinish={validete}
        >
          <Title className={styles.textCenter} level={3}>
            Cadastro Novo Usuario
          </Title>

          <Form.Item validateStatus="validating" label="Nome: ">
            <Input
              id="nameDoctor"
              value={formValue?.nameDoctor}
              name="nameDoctor"
              onChange={handleChange}
            />
            <label style={{ color: 'red' }}>{objError?.name}</label>
          </Form.Item>

          {/*DATA DE NASCIMENTO DESATIVADA PARA FUTURA IMPLANTAÇÃO*/}
          {/*<Form.Item label="Data de Nascimento: ">
                <DatePicker onChange={(date) => {
                  setValor({...formValue, ['birthday']: moment(date).format(dateFormat)});
                }} id="birthday" name="birthday" className={styles.formBorderRadius} format={dateFormat} />
              </Form.Item>*/}

          <Form.Item label="CRM: ">
            <Input id="crm" name="crm" onChange={handleChange} />
            <label style={{ color: 'red' }}>{objError?.crm}</label>
          </Form.Item>

          <Form.Item name="crmUf" label="CRM UF: ">
            <Select
              onChange={(uf) => {
                setValor({ ...formValue, ['crmUf']: uf })
              }}
              id="crmUf"
              className={styles.formBorderRadius}
            >
              {fakeCrmUf.map((uf) => (
                <Select.Option key={uf} value={uf}>
                  {uf}
                </Select.Option>
              ))}
            </Select>
            <label style={{ color: 'red' }}>{objError?.crmUf}</label>
          </Form.Item>

          <Form.Item label="Email: ">
            <Input
              id="email"
              name="email"
              alt="Seu E-mail"
              onChange={handleChange}
            />
            <label style={{ color: 'red' }}>{objError?.email}</label>
          </Form.Item>

          <Form.Item
            label="Confirme o Email: "
            // dependencies={['email']}
            // rules={[
            //   {
            //     required: true,
            //     message: 'Please confirm your email!',
            //   },
            //   ({ getFieldValue }) => ({
            //     validator(_, value) {
            //       if (!value || getFieldValue('email') === value) {
            //         return Promise.resolve()
            //       }
            //       return Promise.reject(
            //         new Error('The two emails that you entered do not match!')
            //       )
            //     },
            //   }),
            // ]}
          >
            <Input
              id="confEmail"
              name="confEmail"
              alt="Confirme seu E-mail"
              onChange={handleChange}
            />
            <label style={{ color: 'red' }}>{objError?.email}</label>
          </Form.Item>

          <Form.Item label="Senha: ">
            <Input.Password
              id="password"
              name="password"
              alt="Senha"
              onChange={handleChange}
            />
            <label style={{ color: 'red' }}>{objError?.password}</label>
          </Form.Item>

          <Form.Item label="Confirme sua Senha: ">
            <Input.Password
              id="confPassword"
              name="confPassword"
              alt="Confirme a Senha"
              onChange={handleChange}
            />
            <label style={{ color: 'red' }}>{objError?.password}</label>
          </Form.Item>

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

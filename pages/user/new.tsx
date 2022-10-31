import {
  Button, DatePicker,
  Form,
  Input, Select,
  Typography
} from 'antd'
import axios from 'axios'
import moment from 'moment'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { fakeCrmUf } from '../../services/fakeCrmUf'
import newStyles from './new.module.css'
const { Title } = Typography
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY']

/**
 * FORMULARIO DE CADASTRO
 */
const Login: NextPage = () => {

  const initialValues = {
    nameDoctor: '',
    birthday: '',
    crm: '',
    crmUf: '',
    email: '',
    confEmail: '',
    password: '',
    confPassword: '',
  }

  const [formValue, setValor] = useState(initialValues);

  function handleChange(event: { target: { name: any; value: any } }){
    const {name, value } = event.target;
    setValor({...formValue, [name]: value});
    //console.log(formValue);
  }
  
  const router = useRouter();

  /*function handleSubmit(event: { preventDefaut: () => void }){
    event.preventDefaut();
    axios
    .post("../api/doctor/create.ts", formValue)
    //.then((resp) => {router.push("/");})
    //.catch(() => {console.log("deu errado");});
  }*/

  function handleSubmit(){
    axios
    .post("../api/doctor/create.ts", formValue)
    //.then((resp) => {router.push("/");})
    //.catch(() => {console.log("deu errado");});
  } 

  function validete(){
    console.log("validando email...")
    if(formValue.email == formValue.confEmail){
      console.log("email validado...")
    }else{
      console.log("email errado...")
    }

    return "";
  }
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
                <Input id="nameDoctor" name="nameDoctor" onChange={handleChange}/>
              </Form.Item>
  
              <Form.Item label="Data de Nascimento: ">
                <DatePicker onChange={(date) => {
                  setValor({...formValue, ['birthday']: moment(date).format('DD-MM-YYYY')});
                }} id="birthday" name="birthday" className={newStyles.formBorderRadius} format={dateFormatList[0]} />
              </Form.Item>
  
              <Form.Item label="CRM: ">
                <Input id="crm" name="crm" onChange={handleChange}/>
              </Form.Item>
  
              <Form.Item name="crmUf" label="CRM UF: ">
                <Select onChange={(uf) =>{
                  setValor({...formValue, ['crmUf']: uf});
                }} id="crmUf" className={newStyles.formBorderRadius}>
                  {fakeCrmUf.map((uf) => (
                    <Select.Option key={uf} value={uf}>
                      {uf}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
  
              <Form.Item label="Email: ">
                <Input id="email" name="email" alt="Seu E-mail" onChange={handleChange}/>
              </Form.Item>
  
              <Form.Item label="Confirme o Email: ">
                <Input id="confEmail" name="confEmail" alt="Confirme seu E-mail" onChange={handleChange}/>
              </Form.Item>
  
              <Form.Item label="Senha: ">
                <Input.Password id="password" name="password" alt="Senha" onChange={handleChange}/>
              </Form.Item>
  
              <Form.Item label="Confirme sua Senha: ">
                <Input.Password id="confPassword" name="confPassword" alt="Confirme a Senha" onChange={handleChange}/>
              </Form.Item>
  
              <Form.Item label=" ">
                <Button onClick={handleSubmit} className={newStyles.button} shape="round" size="large" type="primary" htmlType="submit">
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>
        </div>
      </div>
    );  
}

export default Login;
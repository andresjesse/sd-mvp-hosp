import {
    Button,
    DatePicker,
    Form,
    Input,
    Select,
    Col,
    Row,
    Divider,
    Typography,
  } from 'antd';

import React, { useState } from 'react';
const { Title } = Typography;
type SizeType = Parameters<typeof Form>[0]['size'];

{/**import enUS from 'antd/es/locale/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en'); */}

{/**FAZER***
RESPONSIVO.
LINGUAGEM DO ELEMENTO DATAPICKER EM PORTUGUES.
IDENTAR CODE.
 */}



  const App: React.FC = () => {
    const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
{/**    const [locale, setLocal] = useState(enUS);
 */}
  
    const onFormLayoutChange = ({ size }: { size: SizeType }) => {
      setComponentSize(size);
    };
    
    return (
      <>
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
        <Divider orientation='left'><Title level={3}>Cadastro Novo usuario</Title></Divider>
        </Col>
        <Col span={6}></Col>
        
      </Row>
        <Row>
          <Col span={6}></Col>
          <Col span={12}>
          <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          initialValues={{ size: componentSize }}
          onValuesChange={onFormLayoutChange}
          size={componentSize as SizeType}
        >
          {/**<Form.Item label="Form Size" name="size">
            <Radio.Group>
              <Radio.Button value="small">Small</Radio.Button>
              <Radio.Button value="default">Default</Radio.Button>
              <Radio.Button value="large">Large</Radio.Button>
            </Radio.Group>
          </Form.Item> */}
        
        <Form.Item label="Nome">
          <Input name='nameDoctor'/>
        </Form.Item>
        <Form.Item label="Sobrenome">
          <Input name='lastNameDoctor'/>
        </Form.Item>
        {/*
        <Form.Item label="Função: ">
          <Select>
            <Select.Option value="doctor">Medico(a)</Select.Option>
            <Select.Option value="enf">Enfermeiro(a)</Select.Option>
          </Select>
        </Form.Item>
        */}
        <Form.Item label="Data de Nascimento: ">
        <DatePicker />
        </Form.Item>
        <Form.Item label="CRM: ">
          <Input name='crm'/>
        </Form.Item>
        <Form.Item label="CRM UF: ">
          <Select>
            <Select.Option value="pr">Paraná</Select.Option>
            <Select.Option value="sp">São Paulo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Email: ">
          <Input name='email' alt='Seu E-mail'/>
        </Form.Item>
        <Form.Item label="Confirme o Email: ">
          <Input name='confEmail' alt='Confirme seu E-mail'/>
        </Form.Item>

        <Form.Item label="Senha: ">
          <Input name='password' alt='Senha'/>
        </Form.Item>

        <Form.Item label="Confirme sua Senha: ">
          <Input name='confPassword' alt='Confirme a Senha'/>
        </Form.Item>


        <Row>
          <Col span={6}></Col>
          <Col span={12}>
          <Form.Item>
          <Button>Cadastrar</Button>
          </Form.Item>
          </Col>
          <Col span={6}></Col>
        </Row>
      </Form>
      
          </Col>
          <Col span={6}></Col>
        </Row>
      </>
    );
  };
  
  export default App;
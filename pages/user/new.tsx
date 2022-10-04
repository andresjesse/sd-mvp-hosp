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
  Card,
} from "antd";

import React, { useState } from "react";
const { Title } = Typography;
type SizeType = Parameters<typeof Form>[0]["size"];

{
  /**import enUS from 'antd/es/locale/en_US';
import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('en'); */
}

{
  /**FAZER***
RESPONSIVO.
LINGUAGEM DO ELEMENTO DATAPICKER EM PORTUGUES.
IDENTAR CODE.
 */
}

const App: React.FC = () => {
  return (
    <Card>
      <Row justify="center">
        <Title level={3}>Cadastro Novo usuario</Title>
      </Row>

      <Row justify="center" style={{ padding: "5%" }}>
        <Form
          layout="horizontal"
          labelWrap
          labelCol={{ flex: "120px" }}
          wrapperCol={{ flex: 1 }}
          colon={false}
        >
          <Form.Item label="Nome">
            <Input name="nameDoctor" />
          </Form.Item>

          <Form.Item label="Sobrenome">
            <Input name="lastNameDoctor" />
          </Form.Item>

          {/* => Pode remover isso, a princípio não vamos usar.
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
            <Input name="crm" />
          </Form.Item>

          <Form.Item label="CRM UF: ">
            <Select>
              <Select.Option value="pr">Paraná</Select.Option>
              <Select.Option value="sp">São Paulo</Select.Option>
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
            <Button type="primary" htmlType="submit">
              Cadastrar
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </Card>
  );
};

export default App;

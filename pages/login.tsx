import { Button, Card, Checkbox, Form, Input } from "antd";
import Link from "next/link";
import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";
import Router from "next/router";
import { useState } from "react";

const App: React.FC = () => {
  const [error, setError] = useState("");

  const onFinish = async (values: any) => {
    const email: string = values.email;
    const password: string = values.password;

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!res?.ok) {
      console.log(res);
      console.log(res?.error);
      setError(res?.error);
      return;
    }

    console.log(res);
    await Router.push("/welcome");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Insira um email válido!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Senha"
          name="password"
          rules={[{ required: true, message: "Preencha sua senha!" }]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Lembrar</Checkbox>
        </Form.Item>

        <Form.Item name="forgot" wrapperCol={{ offset: 8, span: 16 }}>
          <Link href="/">Esquecia a senha</Link>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>

      {error}
    </Card>
  );
};

export default App;

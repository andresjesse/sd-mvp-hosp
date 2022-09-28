import { UserOutlined, FieldTimeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { ReactNode, useState } from "react";

const { Header, Content, Sider, Footer } = Layout;

interface PageLayoutProps {
  children: ReactNode;
}

const siderItems = [
  {
    label: "Médico",
    key: "doctor",
    icon: <UserOutlined style={{ color: "black" }} />,
  },
  {
    label: "Escala",
    key: "scale",
    icon: <FieldTimeOutlined style={{ color: "black" }} />,
  },
];

export default function PageLayout({ children }: PageLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
      <Header className="header">
        <div style={{ color: "white" }}>LOGO AQUI</div>
      </Header>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu mode="inline" defaultSelectedKeys={["1"]} items={siderItems} />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Hospital MVP ©2022 Created by TSI
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

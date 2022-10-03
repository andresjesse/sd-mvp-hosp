import {
  FieldTimeOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { ReactNode, useState } from "react";

const { Header, Content, Sider, Footer } = Layout;

import styles from "./styles.module.css";

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
      <Header className={`header ${styles.header}`}>
        <div>LOGO AQUI</div>
        <div>
          Logout <LogoutOutlined />
        </div>
      </Header>

      <Layout className={styles.layoutMain}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu mode="inline" defaultSelectedKeys={["1"]} items={siderItems} />
        </Sider>

        <Layout className={styles.layoutContent}>
          <Content className={styles.content}>{children}</Content>

          <Footer className={styles.footer}>
            Hospital MVP ©2022 Created by TSI
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

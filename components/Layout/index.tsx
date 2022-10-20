import {
  FieldTimeOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

const { Header, Content, Sider, Footer } = Layout

interface PageLayoutProps {
  children: ReactNode
}

const siderItems = [
  {
    label: (
      <Link href="/profile">
        <a>Médico</a>
      </Link>
    ),
    key: 'doctor',
    icon: <UserOutlined style={{ color: 'black' }} />,
  },
  {
    label: (
      <Link href="/schedule">
        <a>Escala</a>
      </Link>
    ),
    key: 'schedule',
    icon: <FieldTimeOutlined style={{ color: 'black' }} />,
  },
]

export default function PageLayout({ children }: PageLayoutProps) {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout>
      <Header
        className="header"
        style={{
          paddingLeft: '24px',
          paddingRight: '24px',
          color: 'white !important',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Link href="/">
            <a>LOGO AQUI</a>
          </Link>
        </div>
        <div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            style={{ background: 'none', border: 'none' }}
          >
            Logout
            <LogoutOutlined />
          </button>
        </div>
      </Header>

      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <Menu mode="inline" defaultSelectedKeys={['1']} items={siderItems} />
        </Sider>

        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ padding: 24, margin: 0, minHeight: 280 }}>
            {children}
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            Hospital MVP ©2022 Created by TSI
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

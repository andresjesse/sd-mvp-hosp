import {
  FieldTimeOutlined,
  LoginOutlined,
  LogoutOutlined,
  SecurityScanOutlined,
  UserOutlined,
  ReconciliationOutlined,
} from '@ant-design/icons'
import { Button, Layout, Menu } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'

const { Header, Content, Sider, Footer } = Layout

interface PageLayoutProps {
  children: ReactNode
}

const siderItems = [
  {
    label: (
      <Link href="/profile">
        <a>Perfil</a>
      </Link>
    ),
    key: 'profile',
    icon: <UserOutlined />,
  },
  {
    label: (
      <Link href="/schedule">
        <a>Escala</a>
      </Link>
    ),
    key: 'schedule',
    icon: <FieldTimeOutlined />,
  },
  {
    label: (
      <Link href="/admin">
        <a>Admin</a>
      </Link>
    ),
    key: 'admin',
    icon: <SecurityScanOutlined />,
  },
  {
    label: (
      <Link href="/doctor">
        <a>Médico</a>
      </Link>
    ),
    key: 'doctor',
    icon: <ReconciliationOutlined />,
  },
]

export default function PageLayout({ children }: PageLayoutProps) {
  const { data: session, status } = useSession()
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
        <Link href="/">
          <div style={{ display: 'flex', cursor: 'pointer' }}>
            <div
              style={{
                position: 'relative',
                width: '56px',
              }}
            >
              <Image
                alt="Image Alt"
                src="/logo.png"
                layout="fill"
                objectFit="contain" // Scale your image down to fit into the container
              />
            </div>
            <span style={{ marginLeft: 10, fontWeight: 'bold' }}>MVP SD</span>
          </div>
        </Link>

        {status === 'authenticated' ? (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Logado como {session?.user?.name}
            <Button
              type="text"
              onClick={() => signOut({ callbackUrl: '/' })}
              style={{ fontWeight: 'bold' }}
            >
              Deslogar-se
              <LogoutOutlined />
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <div style={{ fontWeight: 'bold' }}>
              <span style={{ marginRight: 10, cursor: 'pointer' }}>
                Fazer Login
              </span>
              <LoginOutlined />
            </div>
          </Link>
        )}
      </Header>

      <Layout style={{ minHeight: '100vh' }}>
        {status === 'authenticated' && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              items={siderItems}
              theme="dark"
            />
          </Sider>
        )}

        <Layout>
          <Content style={{ padding: 10, minHeight: 280 }}>{children}</Content>

          <Footer style={{ textAlign: 'center' }}>
            Hospital MVP ©2022 Created by TSI
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  )
}

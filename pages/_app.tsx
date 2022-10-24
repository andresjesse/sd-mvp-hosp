import { ConfigProvider } from 'antd'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'

import locale from 'antd/lib/locale/pt_BR'

import 'antd/dist/antd.variable.min.css'
import '../styles/globals.css'

ConfigProvider.config({
  theme: {
    primaryColor: '#3e9278',
  },
})

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <ConfigProvider locale={locale}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </SessionProvider>
  )
}

export default MyApp

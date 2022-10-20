// import type { AppProps } from "next/app";
// import Layout from "../components/Layout";

// import "../styles/globals.css";
// import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Layout>
//       <Component {...pageProps} />
//     </Layout>
//   );
// }

// export default MyApp;
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import { ConfigProvider } from 'antd'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

import '../styles/globals.css'
import 'antd/dist/antd.variable.min.css'

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
      <ConfigProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ConfigProvider>
    </SessionProvider>
  )
}

export default MyApp

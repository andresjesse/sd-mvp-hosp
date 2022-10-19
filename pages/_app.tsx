import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import "../styles/globals.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) {
  return (
    <SessionProvider session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;

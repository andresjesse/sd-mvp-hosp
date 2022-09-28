import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import "../styles/globals.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;

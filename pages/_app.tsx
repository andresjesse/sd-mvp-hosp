import type { AppProps } from 'next/app'

import '../styles/globals.css'
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

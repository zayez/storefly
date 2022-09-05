// index.html
import Layout from '../comps/Layout'
import '../styles/index.sass'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

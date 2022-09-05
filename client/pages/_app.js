// index.html
import Layout from '../comps/Layout'
import '../styles/index.sass'

const defaultLayout = (page) => {
  return <Layout>{page}</Layout>
}

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? defaultLayout
  return getLayout(<Component {...pageProps} />)
}

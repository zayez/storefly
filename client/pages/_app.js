// index.html
import { storeLayout } from '../comps/Layout'
import { Provider } from 'react-redux'
import store from '../store'
import '../styles/index.sass'

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? storeLayout
  return getLayout(
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>,
  )
}

export default MyApp

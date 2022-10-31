// index.html
import React from 'react'
import { storeLayout } from '../comps/Layout'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store'
import '../styles/index.sass'

const MyApp = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout ?? storeLayout
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}

export default MyApp

// index.html
import React from 'react'
import { storeLayout } from '../comps/Layout'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from '../store'
import '../styles/index.sass'
import { SwitchTransition, CSSTransition } from 'react-transition-group'

const MyApp = ({ Component, pageProps, router }) => {
  const nodeRef = React.useRef(null)
  const getLayout = Component.getLayout ?? storeLayout
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {getLayout(
            <SwitchTransition mode="out-in">
              <CSSTransition
                nodeRef={nodeRef}
                key={router.pathname}
                classNames="page"
                timeout={300}
              >
                <div ref={nodeRef}>
                  <Component {...pageProps} />
                </div>
              </CSSTransition>
            </SwitchTransition>,
          )}
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}

export default MyApp

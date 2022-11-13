import Head from 'next/head'
import { adminLayout } from '../../../comps/Layout'

const Order = ({}) => {
  return (
    <>
      <Head>
        <title>Storefly dashboard - Order</title>
      </Head>
      <div className="container">
        <h1>Order</h1>
      </div>
    </>
  )
}

Order.getLayout = adminLayout

export default Order

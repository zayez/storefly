import Head from 'next/head'
import { adminLayout } from '../../../comps/Layout'
import IOrders from '../../../node_modules/feather-icons/dist/icons/layers.svg'
import OrderList from '../../../comps/admin/OrderList'

const orders = [
  {
    id: 1,
    client: 'Lando',
    total: 35.5,
  },
  {
    id: 2,
    client: 'Ricciardo',
    total: 150,
  },
  {
    id: 3,
    client: 'Lopez',
    total: 1500,
  },
  {
    id: 4,
    client: 'Alonso',
    total: 340.25,
  },
  {
    id: 5,
    client: 'Lewis',
    total: 832.99,
  },
]

const Orders = ({}) => {
  return (
    <>
      <Head>
        <title>Storefly dashboard - Orders</title>
      </Head>
      <div className="container">
        <div className="heading">
          <IOrders />
          <h1>Orders</h1>
        </div>
        <hr />
        <OrderList orders={orders} />
      </div>
    </>
  )
}

Orders.getLayout = adminLayout

export default Orders

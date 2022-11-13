import { useRouter } from 'next/router'

const OrderItem = ({ order }) => {
  const router = useRouter()
  const handleItemClick = (e) => {
    e.preventDefault()
    router.push(`/admin/orders/${order.id}`)
  }
  return (
    <tr onClick={handleItemClick}>
      <td>{order.id}</td>
      <td>{order.client}</td>
      <td>{order.total}</td>
    </tr>
  )
}

const OrderList = ({ orders }) => {
  return (
    <div className="order-list">
      <table className="table-basic">
        <thead>
          <tr>
            <th>#</th>
            <th>Client</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderItem order={order} key={order.id} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OrderList

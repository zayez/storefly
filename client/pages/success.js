import { useDispatch } from 'react-redux'
import { clearCart } from '../store/slices/cartSlice'

const Success = () => {
  const dispatch = useDispatch()
  dispatch(clearCart())
  return (
    <div>
      <h1>Success</h1>
      <p>Order successfully placed. Wait for delivery.</p>
    </div>
  )
}

export default Success

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CartList from '../comps/CartList'
import {
  calculateSubtotal,
  clearCart,
  selectCart,
} from '../store/slices/cartSlice'

let dollarUS = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Cart = () => {
  const cart = useSelector(selectCart)

  return (
    <>
      <Head>
        <title>Storefly | Cart </title>
      </Head>
      <div>
        <h1>Shopping Cart</h1>
        {cart.loading && <div>Loading...</div>}
        {!cart.loading && cart.items.length ? (
          <>
            <CartList items={cart.items} />
            <CartFooter />
          </>
        ) : null}
      </div>
    </>
  )
}

const CartFooter = () => {
  const cart = useSelector(selectCart)
  const router = useRouter()
  const dispatch = useDispatch()
  const handleContinueShopping = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const handleClearCart = (e) => {
    dispatch(clearCart())
  }

  useEffect(() => {
    dispatch(calculateSubtotal())
  }, [cart.items])

  return (
    <>
      <div className="cart-footer">
        <div className="cart-footer-clear">
          <button className="btn btn-secondary" onClick={handleClearCart}>
            Clear cart
          </button>
        </div>
        <div className="cart-footer-checkout">
          <h3 className="cart-subtotal">
            Subtotal: {dollarUS.format(cart.subtotal)}
          </h3>
          <p>Taxes and shipping calculated at checkout</p>
          <div className="shop-group">
            <button className="btn btn-primary">Checkout</button>
            <button
              className="btn btn-secondary"
              onClick={handleContinueShopping}
            >
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

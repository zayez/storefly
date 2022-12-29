import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CartList from '../comps/CartList'
import IArrowLeft from '../node_modules/feather-icons/dist/icons/arrow-left.svg'
import {
  calculateSubtotal,
  clearCart,
  createStripeCheckout,
  selectCart,
  resetCheckout,
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
        {cart.items.length === 0 ? (
          <div>
            <p>Your cart is currently empty.</p>
            <h2>
              <IArrowLeft />
              <a href="/">Start shopping</a>
            </h2>
          </div>
        ) : null}
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

  const handleCheckout = () => {
    const items = cart.items.map((i) => {
      return {
        id: i.id,
        quantity: i.quantity,
      }
    })
    dispatch(createStripeCheckout({ items: items }))
  }

  useEffect(() => {
    dispatch(calculateSubtotal())
  }, [cart.items])

  useEffect(() => {
    dispatch(resetCheckout())
  }, [])

  useEffect(() => {
    if (cart.isCheckoutComplete) {
      const url = cart.targetUrl
      window.location = url
    }
  }, [cart.isCheckoutComplete])

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
            <button className="btn btn-primary" onClick={handleCheckout}>
              Checkout
            </button>
            <button className="btn" onClick={handleContinueShopping}>
              Continue shopping
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart

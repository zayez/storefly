import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  items: [],
  subtotal: 0,
  error: '',
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const item = { ...action.payload, quantity: 1 }
      const index = state.items.findIndex((i) => i.id === item.id)
      if (index < 0) {
        state.items = [...state.items, item]
      } else {
        state.items[index].quantity = state.items[index].quantity + 1
      }
    },
    removeItem(state, action) {
      state.items = state.items.filter((i) => i.id !== action.payload)
    },
    increaseItem(state, action) {
      const id = action.payload
      const index = state.items.findIndex((i) => i.id === id)
      state.items[index].quantity = state.items[index].quantity + 1
    },
    decreaseItem(state, action) {
      const id = action.payload
      const index = state.items.findIndex((i) => i.id === id)
      if (state.items[index].quantity === 1) {
        state.items = state.items.filter((i) => i.id !== id)
        return
      } else {
        state.items[index].quantity = state.items[index].quantity - 1
      }
    },
    clearCart(state, action) {
      state.items = []
    },
    calculateSubtotal(state, action) {
      const total = state.items.reduce(
        (acc, cur) => acc + cur.price * cur.quantity,
        0,
      )

      state.subtotal = total
    },
  },
})

export const {
  addItem,
  removeItem,
  increaseItem,
  decreaseItem,
  clearCart,
  calculateSubtotal,
} = cartSlice.actions
export const selectCart = (state) => state.cart

export default cartSlice.reducer

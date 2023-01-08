import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ActionStatus } from '../../types/ActionStatus'
import { toast } from 'react-toastify'

const initialState = {
  loading: false,
  orders: [],
  currentOrder: null,
  error: '',
}

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  return fetch(`/api/orders`).then((res) => res.json())
})

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.loading = false
      state.orders = action.payload
      state.error = ''
    })
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.loading = false
      state.orders = []
      state.error = action.error.message
    })
  },
})

export const selectOrders = (state) => state.orders

export default ordersSlice.reducer

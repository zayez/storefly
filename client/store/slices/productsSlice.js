import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  products: [],
  currentProduct: null,
  error: '',
}

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    return fetch(`/api/products`).then((res) => res.json())
  },
)

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id) => {
    return fetch(`/api/products/${id}`).then((res) => res.json())
  },
)

const productsSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false
      state.products = action.payload
      state.error = ''
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false
      state.products = []
      state.error = action.error.message
    })
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false
      state.currentProduct = action.payload
      state.error = ''
    })
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false
      state.currentProduct = null
      state.error = action.error.message
    })
  },
})

export const selectProduct = (state) => state.products
export const selectCurrentProduct = (state) => state.products.currentProduct
export const selectProducts = (state) => state.products.products

export default productsSlice.reducer

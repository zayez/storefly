import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  categories: [],
  currentCategory: null,
  error: '',
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    return fetch(`/api/categories`).then((res) => res.json())
  },
)

const categoriesSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.loading = false
      state.categories = action.payload
      state.error = ''
    })
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.loading = false
      state.categories = []
      state.error = action.error.message
    })
  },
})

export const selectCategories = (state) => state.categories

export default categoriesSlice.reducer

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ActionStatus } from '../../types/ActionStatus'

const initialState = {
  loading: false,
  categories: [],
  category: null,
  currentCategory: null,
  error: '',
  errors: [],
}

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async () => {
    return fetch(`/api/categories`).then((res) => res.json())
  },
)

export const fetchCategory = createAsyncThunk(
  'categories/fetchCategory',
  async (id) => {
    return fetch(`/api/categories/${id}`).then((res) => res.json())
  },
)

export const update = createAsyncThunk(
  'categories/update',
  async ({ id, title }, { rejectWithValue }) => {
    const category = {}
    if (title) category.title = title
    const reqOpts = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(category),
    }

    const url = `/api/categories/${id}`
    return fetch(url, reqOpts).then(async (res) => {
      switch (res.status) {
        case 200:
          return res.json()
        case 400:
          return res.json()
        case 422:
          return rejectWithValue(await res.json())
        default:
          return rejectWithValue(ActionStatus.Error)
      }
    })
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

    builder.addCase(fetchCategory.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.loading = false
      state.category = action.payload
      state.error = ''
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.loading = false
      state.category = null
      state.error = action.error.message
    })

    builder.addCase(update.pending, (state) => {
      state.loading = true
    })
    builder.addCase(update.fulfilled, (state, action) => {
      console.log(action.payload)
      state.loading = false
      state.category = action.payload
      state.error = ''
    })
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false
      switch (action.payload.status) {
        case 422:
          state.error = 'There are errors on the form.'
          state.errors = []
          action.payload['invalid-params'].forEach((param) => {
            state.errors.push(param.reason)
          })
          break
        default:
          state.error = action.payload.detail
          break
      }

      console.log(state.errors)
    })
  },
})

export const selectCategories = (state) => state.categories

export default categoriesSlice.reducer

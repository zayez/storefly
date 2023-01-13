import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  users: [],
  error: '',
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return fetch(`/api/users`).then((res) => res.json())
})

export const fetchUsersByRole = createAsyncThunk(
  'users/fetchUsersByRole',
  async (role) => {
    const data = await fetch(`/api/users?role=${role}`)
    const res = await data.json()
    return res
  },
)

export const update = createAsyncThunk(
  'users/update',
  async ({ id, firstName, lastName, email }) => {
    const user = {}
    if (firstName) user.firstName = firstName
    if (lastName) user.lastName = lastName
    if (email) user.email = email
    const reqOpts = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    }

    const url = `/api/users/${id}`
    return fetch(url, reqOpts)
  },
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false
      state.users = []
      state.error = action.error.message
    })

    builder.addCase(fetchUsersByRole.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchUsersByRole.fulfilled, (state, action) => {
      state.loading = false
      state.users = action.payload
      state.error = ''
    })
    builder.addCase(fetchUsersByRole.rejected, (state, action) => {
      state.users = []
      state.error = action.error.message
    })

    builder.addCase(update.pending, (state) => {
      state.loading = true
    })
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false
      state.error = ''
    })
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

export const selectUser = (state) => state.users
export const selectUsers = (state) => state.users.users

export default usersSlice.reducer

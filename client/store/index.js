import { combineReducers, configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice'

const combineReducer = combineReducers({ user })

export default configureStore({ reducer: combineReducer })

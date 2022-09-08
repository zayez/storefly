import { combineReducers, configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import product from './slices/productSlice'

const combineReducer = combineReducers({ user, product })

export default configureStore({ reducer: combineReducer })

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import user from './slices/userSlice'
import product from './slices/productSlice'
import auth from './slices/authSlice'

const combineReducer = combineReducers({ user, product, auth })

export default configureStore({ reducer: combineReducer })

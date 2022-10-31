import { combineReducers, configureStore } from '@reduxjs/toolkit'
import users from './slices/usersSlice'
import products from './slices/productsSlice'
import auth from './slices/authSlice'

const combineReducer = combineReducers({ users, products, auth })

export default configureStore({ reducer: combineReducer })

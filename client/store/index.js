import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import users from './slices/usersSlice'
import products from './slices/productsSlice'
import auth from './slices/authSlice'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({ users, products, auth })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
})

export const persistor = persistStore(store)

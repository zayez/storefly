import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuth, signUser } from '../store/slices/authSlice'
import ProductsView from '../views/ProductsView'

const Index = () => {
  const dispatch = useDispatch()
  const auth = useSelector(selectAuth)
  useEffect(() => {
    dispatch(signUser())
  }, [])
  return (
    <>
      <Head>
        <title>Storefly | Home </title>
      </Head>
      <div>
        <h1>Home</h1>
        <ProductsView />
      </div>
    </>
  )
}

export default Index

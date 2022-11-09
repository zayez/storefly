import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Callout from '../../../comps/Callout'
import { adminLayout } from '../../../comps/Layout'
import IProducts from '../../../node_modules/feather-icons/dist/icons/package.svg'
import {
  fetchProducts,
  selectProducts,
} from '../../../store/slices/productsSlice'

import Loader from '../../../comps/Loader'
import { SPINNER_TYPE } from '../../../types/LoaderType'
import ProductList from '../../../comps/admin/ProductList'

const Products = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const [selectedId, setSelectedId] = useState(0)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {}, [products.message])

  const handleAddProduct = (e) => {
    router.push('/admin/products/new')
  }

  const handleModalEnter = () => {
    console.log('hello there')
  }
  return (
    <>
      <Head>
        <title>Storefly dashboard | Products</title>
      </Head>
      <div className="container">
        <div className="heading-spaced">
          <div className="heading">
            <IProducts />
            <h1>Products</h1>
          </div>
          <button className="btn btn-primary" onClick={handleAddProduct}>
            Add product
          </button>
        </div>
        <hr />
        {products.loading ? <Loader type={SPINNER_TYPE} /> : null}
        {!products.loading && products.error ? (
          <div>Error: {products.error}</div>
        ) : null}
        {!products.loading && products.products?.length ? (
          <ProductList
            products={products.products}
            onDelete={handleModalEnter}
          />
        ) : null}
      </div>
    </>
  )
}

Products.getLayout = adminLayout

export default Products

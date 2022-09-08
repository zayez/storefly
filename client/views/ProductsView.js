import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductList from '../comps/ProductList'
import {
  fetchProducts,
  selectProduct,
  selectProducts,
} from '../store/slices/productSlice'
const ProductsView = ({}) => {
  const product = useSelector(selectProduct)
  const products = useSelector(selectProducts)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchProducts())
  }, [])
  return (
    <>
      <h2>Products</h2>
      {product.loading && <div>Loading...</div>}
      {!product.loading && product.error ? (
        <div>Error: {product.error}</div>
      ) : null}
      {!product.loading && products.length ? (
        <ProductList products={products} />
      ) : null}
    </>
  )
}

export default ProductsView

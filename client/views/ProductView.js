import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchProduct,
  selectCurrentProduct,
  selectProduct,
} from '../store/slices/productSlice'
import Product from '../comps/Product'

const ProductView = ({ id }) => {
  const dispatch = useDispatch()
  const product = useSelector(selectProduct)
  const currentProduct = useSelector(selectCurrentProduct)
  useEffect(() => {
    if (id) dispatch(fetchProduct(id))
  }, [id])

  return (
    <>
      <h2>Product</h2>
      {product.loading && <div>Loading...</div>}
      {!product.loading && product.error ? (
        <div>Error: {product.error}</div>
      ) : null}
      {!product.loading && currentProduct ? (
        <Product product={currentProduct} />
      ) : null}
    </>
  )
}

export default ProductView

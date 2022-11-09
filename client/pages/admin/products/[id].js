import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductForm from '../../../comps/admin/ProductForm'
import { CalloutError } from '../../../comps/Callout'
import { adminLayout } from '../../../comps/Layout'
import Loader from '../../../comps/Loader'
import {
  fetchProduct,
  resetProduct,
  selectProducts,
} from '../../../store/slices/productsSlice'
import { SPINNER_TYPE } from '../../../types/LoaderType'

const ProductEdit = ({}) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const products = useSelector(selectProducts)
  const { id } = router.query
  useEffect(() => {
    if (id) {
      dispatch(resetProduct())
      dispatch(fetchProduct(id))
    }
  }, [])

  return (
    <>
      <Head>
        <title>Storefly dashboard | Product edit </title>
      </Head>
      <div className="product-edit">
        {products.loading && <Loader type={SPINNER_TYPE} size="small" />}
        {!products.loading && products.error ? (
          <CalloutError error={products.error} errors={products.errors} />
        ) : null}
        {!products.loading && products.currentProduct ? (
          <ProductForm product={products.currentProduct} />
        ) : null}
      </div>
    </>
  )
}

ProductEdit.getLayout = adminLayout

export default ProductEdit

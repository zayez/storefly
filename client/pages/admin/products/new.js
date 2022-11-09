import Head from 'next/head'
import { useSelector } from 'react-redux'
import ProductForm from '../../../comps/admin/ProductForm'
import { adminLayout } from '../../../comps/Layout'
import Loader from '../../../comps/Loader'
import { selectProducts } from '../../../store/slices/productsSlice'
import { SPINNER_TYPE } from '../../../types/LoaderType'
import { CalloutError } from '../../../comps/Callout'

const ProductNew = ({}) => {
  const products = useSelector(selectProducts)
  return (
    <>
      <Head>
        <title>Storefly dashboard | Product new </title>
      </Head>
      <div className="product-new">
        {products.loading && <Loader type={SPINNER_TYPE} size="small" />}
        {!products.loading && products.error ? (
          <CalloutError error={products.error} errors={products.errors} />
        ) : null}
        {!products.loading ? <ProductForm /> : null}
      </div>
    </>
  )
}

ProductNew.getLayout = adminLayout

export default ProductNew

import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [inventory, setInventory] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategory] = useState('')
  const [statusId, setStatus] = useState('')
  const { id } = router.query
  const product = products.currentProduct
  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id))
    }
  }, [])

  useEffect(() => {
    if (products.currentProduct) {
      setTitle(product.title)
      setDescription(product.description)
      setInventory(product.inventory)
      setPrice(product.price)
      setCategory(product.categoryId)
      setStatus(product.statusId)
    }
  }, [products.currentProduct])

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
          <ProductForm
            id={id}
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            inventory={inventory}
            setInventory={setInventory}
            price={price}
            setPrice={setPrice}
            categoryId={categoryId}
            setCategory={setCategory}
            statusId={statusId}
            setStatus={setStatus}
          />
        ) : null}
      </div>
    </>
  )
}

ProductEdit.getLayout = adminLayout

export default ProductEdit

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  create,
  resetProduct,
  selectProducts,
  update,
} from '../../store/slices/productsSlice'
import {
  fetchCategories,
  selectCategories,
} from '../../store/slices/categoriesSlice'
import {
  fetchProductStatuses,
  selectProductStatuses,
} from '../../store/slices/productStatusesSlice'
import { useRef } from 'react'
import { IMaskInput } from 'react-imask'
const capitalize = require('upper-case-first').upperCaseFirst

const ProductForm = ({ product }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const products = useSelector(selectProducts)
  const categories = useSelector(selectCategories)
  const productStatuses = useSelector(selectProductStatuses)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [inventory, setInventory] = useState('')
  const [price, setPrice] = useState('')
  const [categoryId, setCategory] = useState('')
  const [statusId, setStatus] = useState('')

  const headingText = product ? 'Edit' : 'New'
  const submitText = product ? 'Save' : 'Create'

  const priceRef = useRef(null)
  const priceInputRef = useRef(null)
  const inventoryRef = useRef(null)
  const inventoryInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (product) {
      const id = product.id
      const patchProduct = {
        title,
        description,
        inventory,
        price,
        categoryId,
        statusId,
      }
      dispatch(update({ id, product: patchProduct })).then((res) => {
        if (!res.error) router.push('/admin/products')
      })
    } else {
      dispatch(
        create({ title, description, inventory, price, categoryId, statusId }),
      ).then((res) => {
        router.push('/admin/products')
      })
    }
  }

  const handleBackClick = (e) => {
    e.preventDefault()
    router.push('/admin/products')
  }

  const handlePriceChange = (value, mask) => {
    setPrice(value)
  }

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProductStatuses())
    if (!product) {
      dispatch(resetProduct())
    }
  }, [])

  useEffect(() => {
    const product = products.currentProduct

    if (product) {
      setTitle(product.title)
      setDescription(product.description)
      setInventory(product.inventory)
      setPrice(product.price)
      setCategory(product.categoryId)
      setStatus(product.statusId)
    } else {
      setTitle('')
      setDescription('')
      setInventory('')
      setPrice('')
      setCategory('')
      setStatus('')
    }
  }, [products.currentProduct])
  return (
    <>
      <h1>Product – {headingText}</h1>
      <div className="container">
        <div className="product-details">
          <form onSubmit={handleSubmit} className="form">
            <div className="field">
              <div className="field-label">
                <label htmlFor="id">ID</label>
              </div>
              <div className="field-control">
                <input
                  type="text"
                  defaultValue={product ? product.id : ''}
                  disabled={true}
                  readOnly={true}
                />
              </div>
            </div>

            <div className="field">
              <div className="field-label">
                <label htmlFor="title">Title</label>
              </div>
              <div className="field-body">
                <input
                  type="text"
                  value={title}
                  onChange={({ target }) => setTitle(target?.value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="field-label">
                <label htmlFor="description">Description</label>
              </div>
              <div className="field-body">
                <textarea
                  rows={5}
                  value={description}
                  onChange={({ target }) => setDescription(target?.value)}
                ></textarea>
              </div>
            </div>

            <div className="field">
              <div className="fiel-label">
                <label htmlFor="price">Price</label>
              </div>
              <div className="field-body">
                <IMaskInput
                  value={`${price}`}
                  scale={2}
                  normalizeZeros={true}
                  padFractionalZeros={true}
                  mask={Number}
                  unmask={true}
                  radix=","
                  mapToRadix={['.']}
                  thousandsSeparator="."
                  ref={priceRef}
                  inputRef={priceInputRef}
                  onAccept={handlePriceChange}
                />
              </div>
            </div>

            <div className="field">
              <div className="field-label">
                <label htmlFor='="inventory'>Inventory</label>
              </div>
              <div className="field-body">
                <IMaskInput
                  value={`${inventory}`}
                  mask={Number}
                  scale={0}
                  thousandsSeparator="."
                  ref={inventoryRef}
                  inputRef={inventoryInputRef}
                  onAccept={(value, mask) => setInventory(value)}
                />
              </div>
            </div>

            <div className="field">
              <div className="field-label">
                <label htmlFor="categoryId">Category</label>
              </div>
              <div className="field-body">
                <select
                  value={categoryId}
                  onChange={({ target }) => setCategory(target?.value)}
                >
                  <option key="0" value=""></option>
                  {categories?.categories.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="field">
              <div className="field-label">
                <label htmlFor="statusId">Status</label>
              </div>
              <div className="field-body">
                <select
                  value={statusId}
                  onChange={({ target }) => setStatus(target?.value)}
                >
                  <option key="0" value=""></option>
                  {productStatuses?.productStatuses.map((status) => (
                    <option value={status.id} key={status.id}>
                      {capitalize(status.name)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="buttons">
              <button className="btn" onClick={handleBackClick}>
                Back
              </button>
              <button className="btn btn-primary">{submitText}</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default ProductForm

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { create, resetProduct, update } from '../../store/slices/productsSlice'
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
import { toast } from 'react-toastify'
const capitalize = require('upper-case-first').upperCaseFirst

const ProductForm = ({
  id,
  title,
  setTitle,
  description,
  setDescription,
  inventory,
  setInventory,
  price,
  setPrice,
  categoryId,
  setCategory,
  statusId,
  setStatus,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const categories = useSelector(selectCategories)
  const productStatuses = useSelector(selectProductStatuses)

  const headingText = id ? 'Edit' : 'New'
  const submitText = id ? 'Save' : 'Create'

  const priceRef = useRef(null)
  const priceInputRef = useRef(null)
  const inventoryRef = useRef(null)
  const inventoryInputRef = useRef(null)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(fetchProductStatuses())

    if (!id) {
      resetProduct()
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (id) {
      const patchProduct = {
        title,
        description,
        inventory,
        price,
        categoryId,
        statusId,
      }
      dispatch(update({ id, product: patchProduct })).then((res) => {
        if (!res.error) {
          router.push('/admin/products')
          toast.success('Product successfully updated!', {})
        }
      })
    } else {
      dispatch(
        create({ title, description, inventory, price, categoryId, statusId }),
      ).then((res) => {
        if (!res.error) {
          router.push('/admin/products')
          toast.success('Product successfully created!', {})
        }
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

  return (
    <>
      <h1>Product – {headingText}</h1>
      <div className="container">
        <div className="product-details">
          <form onSubmit={handleSubmit} className="form">
            <div className="row row-one">
              <div className="field">
                <div className="field-label">
                  <label htmlFor="id">ID</label>
                </div>
                <div className="field-control">
                  <input
                    type="text"
                    defaultValue={id ? id : ''}
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
            </div>

            <div className="field">
              <div className="field-label">
                <label htmlFor="description">Description</label>
              </div>
              <div className="field-body">
                <textarea
                  rows={6}
                  value={description}
                  onChange={({ target }) => setDescription(target?.value)}
                ></textarea>
              </div>
            </div>

            <div className="row row-three">
              <div className="field">
                <div className="field-label">
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
            </div>

            <div className="row row-four">
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

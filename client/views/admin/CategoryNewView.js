import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryForm from '../../comps/admin/CategoryForm'
import { CalloutError } from '../../comps/Callout'
import Loader from '../../comps/Loader'
import {
  create,
  removeMessage,
  resetCategory,
  selectCategories,
} from '../../store/slices/categoriesSlice'
import { SPINNER_TYPE } from '../../types/LoaderType'

const CategoryNewView = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const categories = useSelector(selectCategories)
  useEffect(() => {
    dispatch(resetCategory())
  }, [])

  useEffect(() => {
    if (categories.category) {
      router.push('/admin/categories')
      setTimeout(() => {
        dispatch(removeMessage())
      }, 3000)
    }
  }, [categories.category])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(create({ title }))
  }

  const handleBackClick = (e) => {
    e.preventDefault()
    router.push('/admin/categories')
  }
  return (
    <>
      <h1>Category – New</h1>
      {categories.loading && <Loader type={SPINNER_TYPE} size="small" />}
      {!categories.loading && categories.error ? (
        <CalloutError error={categories.error} errors={categories.errors} />
      ) : null}
      {!categories.loading ? (
        <CategoryForm
          id={''}
          title={title}
          setTitle={setTitle}
          submitText={`Create`}
          handleSubmit={handleSubmit}
          handleBackClick={handleBackClick}
        />
      ) : null}
    </>
  )
}

export default CategoryNewView

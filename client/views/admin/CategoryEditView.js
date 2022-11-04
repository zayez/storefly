import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryForm from '../../comps/admin/CategoryForm'
import {
  fetchCategory,
  selectCategories,
  update,
} from '../../store/slices/categoriesSlice'
import { CalloutError } from '../../comps/Callout'
import Loader from '../../comps/Loader'
import { SPINNER_TYPE } from '../../types/LoaderType'

const CategoryEditView = ({ id }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [title, setTitle] = useState('')

  const categories = useSelector(selectCategories)
  const currentCategory = categories.category
  useEffect(() => {
    if (id) {
      dispatch(fetchCategory(id))
    }
  }, [])

  useEffect(() => {
    if (currentCategory) {
      setTitle(currentCategory.title)
    }
  }, [categories.category])

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(update({ id, title }))
  }
  const handleBackClick = (e) => {
    e.preventDefault()
    router.push('/admin/categories')
  }
  return (
    <>
      <h1>Category – Edit</h1>
      {categories.loading && <Loader type={SPINNER_TYPE} size="small" />}
      {!categories.loading && categories.error ? (
        <CalloutError error={categories.error} errors={categories.errors} />
      ) : null}
      {!categories.loading ? (
        <CategoryForm
          id={id}
          title={title}
          setTitle={setTitle}
          handleSubmit={handleSubmit}
          handleBackClick={handleBackClick}
        />
      ) : null}
    </>
  )
}

export default CategoryEditView

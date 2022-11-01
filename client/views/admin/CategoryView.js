import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryForm from '../../comps/admin/CategoryForm'
import {
  fetchCategory,
  selectCategories,
  update,
} from '../../store/slices/categoriesSlice'
import { ToastyError } from '../../comps/Toasty'

const CategoryView = ({ id }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [title, setTitle] = useState('')

  const categories = useSelector(selectCategories)
  const currentCategory = categories.category
  useEffect(() => {
    if (id) dispatch(fetchCategory(id))
    if (currentCategory) {
      setTitle(currentCategory.title)
    }
  }, [])

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
      {categories.loading && <div>Loading...</div>}
      {!categories.loading && categories.error ? (
        <ToastyError error={categories.error} errors={categories.errors} />
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

export default CategoryView

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryForm from '../../comps/admin/CategoryForm'
import { CalloutError } from '../../comps/Callout'
import { create, selectCategories } from '../../store/slices/categoriesSlice'

const CategoryNewView = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const categories = useSelector(selectCategories)
  useEffect(() => {}, [])

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
      {categories.loading && <div>Loading...</div>}
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

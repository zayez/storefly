import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import ICategories from '../../../node_modules/feather-icons/dist/icons/grid.svg'
import { adminLayout } from '../../../comps/Layout'
import {
  fetchCategories,
  selectCategories,
} from '../../../store/slices/categoriesSlice'
import CategoriesList from '../../../comps/admin/CategoriesList'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const Categories = () => {
  const router = useRouter()
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  const handleAddCategory = (e) => {
    e.preventDefault()
    router.push('/admin/categories/new')
  }
  return (
    <>
      <Head>
        <title>Storefly dashboard | Categories </title>
      </Head>
      <div className="container">
        <h1 className="heading">
          <div className="h">
            <ICategories /> <span>Categories</span>
          </div>
          <button className="btn btn-primary" onClick={handleAddCategory}>
            Add category
          </button>
        </h1>
        <hr />
        {categories.loading && <div>Loading...</div>}
        {!categories.loading && categories.error ? (
          <div>Error: {categories.error}</div>
        ) : null}
        {!categories.loading && categories.categories.length ? (
          <CategoriesList categories={categories.categories} />
        ) : null}
      </div>
    </>
  )
}

Categories.getLayout = adminLayout

export default Categories

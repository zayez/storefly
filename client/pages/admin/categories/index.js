import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import ICategories from '../../../node_modules/feather-icons/dist/icons/grid.svg'
import { adminLayout } from '../../../comps/Layout'
import {
  fetchCategories,
  selectCategories,
} from '../../../store/slices/categoriesSlice'
import CategoriesList from '../../../comps/CategoriesList'
import { useEffect } from 'react'

const Categories = () => {
  const categories = useSelector(selectCategories)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  return (
    <>
      <Head>
        <title>Storefly dashboard | Categories </title>
      </Head>
      <div className="container">
        <h1 className="heading">
          <ICategories /> <span>Categories</span>
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

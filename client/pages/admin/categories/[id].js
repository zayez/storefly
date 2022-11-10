import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CategoryForm from '../../../comps/admin/CategoryForm'
import { CalloutError } from '../../../comps/Callout'
import { adminLayout } from '../../../comps/Layout'
import Loader from '../../../comps/Loader'
import {
  fetchCategory,
  selectCategories,
} from '../../../store/slices/categoriesSlice'
import { SPINNER_TYPE } from '../../../types/LoaderType'

const CategoryEdit = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const categories = useSelector(selectCategories)
  const { id } = router.query

  useEffect(() => {
    if (id) {
      dispatch(fetchCategory(id))
    }
  }, [])
  return (
    <>
      <Head>
        <title>Storefly dashboard | Category </title>
      </Head>
      <div className="category-edit">
        {categories.loading && <Loader type={SPINNER_TYPE} size="small" />}
        {!categories.loading && categories.error ? (
          <CalloutError error={categories.error} errors={categories.errors} />
        ) : null}
        {!categories.loading ? (
          <CategoryForm id={id} category={categories.category} />
        ) : null}
      </div>
    </>
  )
}

CategoryEdit.getLayout = adminLayout

export default CategoryEdit

import Head from 'next/head'
import { useRouter } from 'next/router'
import { adminLayout } from '../../../comps/Layout'
import CategoryEditView from '../../../views/admin/CategoryEditView'

const CategoryEdit = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <Head>
        <title>Storefly dashboard | Category </title>
      </Head>
      <div>
        <CategoryEditView id={id} />
      </div>
    </>
  )
}

CategoryEdit.getLayout = adminLayout

export default CategoryEdit

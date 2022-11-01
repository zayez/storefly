import Head from 'next/head'
import { useRouter } from 'next/router'
import CategoryEditView from '../../../views/admin/CategoryEditView'

const CategoryDetails = () => {
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

export default CategoryDetails

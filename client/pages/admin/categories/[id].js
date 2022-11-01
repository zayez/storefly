import Head from 'next/head'
import { useRouter } from 'next/router'
import CategoryView from '../../../views/admin/CategoryView'

const CategoryDetails = () => {
  const router = useRouter()
  const { id } = router.query
  return (
    <>
      <Head>
        <title>Storefly dashboard | Category </title>
      </Head>
      <div>
        <CategoryView id={id} />
      </div>
    </>
  )
}

export default CategoryDetails

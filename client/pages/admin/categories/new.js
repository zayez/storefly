import Head from 'next/head'
import { adminLayout } from '../../../comps/Layout'
import CategoryNewView from '../../../views/admin/CategoryNewView'

const CategoryNew = () => {
  return (
    <>
      <Head>
        <title>Storefly dashboard | Category </title>
      </Head>
      <div>
        <CategoryNewView />
      </div>
    </>
  )
}

CategoryNew.getLayout = adminLayout

export default CategoryNew

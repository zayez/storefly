import Head from 'next/head'
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

export default CategoryNew

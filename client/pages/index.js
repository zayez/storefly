import Head from 'next/head'
import ProductsView from '../views/ProductsView'

const Index = () => {
  return (
    <>
      <Head>
        <title>Storefly | Home </title>
      </Head>
      <div>
        <h1>Home</h1>
        <ProductsView />
      </div>
    </>
  )
}

export default Index

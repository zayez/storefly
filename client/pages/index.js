import Head from 'next/head'
import Products from '../comps/Products'

export const getStaticProps = async () => {
  const url = `http://localhost:2222/products`
  const res = await fetch(url)
  const data = await res.json()
  return {
    props: { products: data },
  }
}

const Index = ({ products }) => {
  return (
    <>
      <Head>
        <title>Storefly | Home </title>
      </Head>
      <div>
        <h1>Home</h1>
        <Products products={products} />
      </div>
    </>
  )
}

export default Index

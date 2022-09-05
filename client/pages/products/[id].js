export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export const getStaticProps = async (context) => {
  const id = context.params.id
  const url = `http://localhost:2222/products/${id}`

  const res = await fetch(url)
  const data = await res.json()
  return {
    props: { product: data },
  }
}

let dollarUS = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const Details = ({ product }) => {
  const baseUrl = `http://localhost:2222`
  return (
    <div className="product-card">
      <div className="product-card-image">
        <p>
          <img src={`${baseUrl}/${product.image}`} />
        </p>
      </div>

      <div className="product-card-details">
        <h1>{product.title}</h1>
        <h2>{dollarUS.format(product.price)}</h2>
        <p>{product.description}</p>
        <button>Add to cart</button>
      </div>
    </div>
  )
}

export default Details

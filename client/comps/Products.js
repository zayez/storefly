const baseUrl = `http://localhost:2222`
import Link from 'next/link'

let dollarUS = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

const ProductItem = ({ product }) => {
  return (
    <div className="product-item" key={product.id}>
      <div className="product-image">
        <Link href={`/products/${product.id}`}>
          <a>
            <img src={`${baseUrl}/${product.image}`} />
          </a>
        </Link>
      </div>
      <div className="product-description">
        <Link href={`/products/${product.id}`}>
          <a>{product.title} </a>
        </Link>
        <div className="price">{dollarUS.format(product.price)}</div>
        <button>Add to cart</button>
      </div>
    </div>
  )
}
const Products = ({ products }) => {
  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </div>
  )
}

export default Products

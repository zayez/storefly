const mapCategory = (category = {}) => {
  const mCategory = {}
  mCategory.id = category.id
  mCategory.title = category.title
  mCategory.createdAt = category.createdAt
  mCategory.updatedAt = category.updatedAt

  return mCategory
}

const mapCategories = (categories = []) => {
  const mCategories = []
  categories.forEach((cat) => {
    mCategories.push(mapCategory(cat))
  })
  return mCategories
}

const mapProduct = (product = {}) => {
  const mProduct = {}
  mProduct.id = product.id
  mProduct.title = product.title
  mProduct.description = product.description
  mProduct.price = product.price
  mProduct.inventory = product.inventory
  mProduct.statusId = product.statusId
  mProduct.categoryId = product.categoryId
  mProduct.createdAt = product.createdAt
  mProduct.updatedAt = product.updatedAt

  return mProduct
}

const mapProducts = (products = []) => {
  const mProducts = []
  products.forEach((prod) => {
    mProducts.push(mapProduct(prod))
  })
  return mProducts
}

module.exports = {
  mapCategory,
  mapCategories,
  mapProduct,
  mapProducts,
}

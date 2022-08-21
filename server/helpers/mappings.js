const mapCategory = (category = {}, { extra = [] } = {}) => {
  const mCategory = {}
  mCategory.title = category.title
  // mCategory.createdAt = category.createdAt
  // mCategory.updatedAt = category.updatedAt

  extra.forEach((attr) => {
    if (category[attr]) mCategory[attr] = category[attr]
  })

  return mCategory
}

const mapCategories = (categories = [], { extra = [] } = {}) => {
  const mCategories = []
  categories.forEach((cat) => {
    mCategories.push(mapCategory(cat, { extra }))
  })
  return mCategories
}

const mapProduct = (product = {}, { extra = [] } = {}) => {
  const mProduct = {}
  mProduct.title = product.title
  mProduct.description = product.description
  mProduct.image = product.image
  mProduct.price = product.price
  mProduct.inventory = product.inventory
  mProduct.statusId = product.statusId
  mProduct.categoryId = product.categoryId
  // mProduct.createdAt = product.createdAt
  // mProduct.updatedAt = product.updatedAt

  extra.forEach((attr) => {
    if (product[attr]) mProduct[attr] = product[attr]
  })

  return mProduct
}

const mapUser = (user = {}, { extra = [] } = {}) => {
  const mUser = {}
  mUser.firstName = user.firstName
  mUser.lastName = user.lastName
  mUser.email = user.email

  extra.forEach((attr) => {
    if (user[attr]) mUser[attr] = user[attr]
  })

  return mUser
}

const mapProducts = (products = [], { extra = [] } = {}) => {
  const mProducts = []
  products.forEach((prod) => {
    mProducts.push(mapProduct(prod, { extra }))
  })
  return mProducts
}

module.exports = {
  mapCategory,
  mapCategories,
  mapProduct,
  mapProducts,
  mapUser,
}

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

module.exports = {
  mapCategory,
  mapCategories,
}

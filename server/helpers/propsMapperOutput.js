require('../models/entity')
/**
 * Map props into a Category.
 * @param {Object} props props
 * @param {integer=} props.id id
 * @param {string=} props.title title
 * @param {datetime=} props.createdAt created at
 * @param {datetime=} props.updatedAt updated at
 * @returns {Category} mapped category
 */
const mapCategory = ({ id, title, createdAt, updatedAt }) => {
  const category = {}
  if (id) category.id = id
  if (title) category.title = title
  if (createdAt) category.createdAt = createdAt
  if (updatedAt) category.updatedAt = updatedAt

  return category
}

/**
 * Map props into a Product.
 * @param {Object} props props
 * @param {integer=} props.id product's id
 * @param {string=} props.title product's title
 * @param {string=} props.description product's description
 * @param {string=} props.image product's image url
 * @param {number=} props.price product's price
 * @param {number=} props.invetory product's inventory
 * @param {number=} props.statusId product's statusId
 * @param {number=} props.categoryId product's categoryId
 * @param {datetime=} props.createdAt created at
 * @param {datetime=} props.updatedAt updated at
 * @returns {Product} mapped product
 */
const mapProduct = ({
  id,
  title,
  description,
  image,
  price,
  inventory,
  statusId,
  categoryId,
  createdAt,
  updatedAt,
}) => {
  const product = {}
  if (id) product.id = id
  if (title) product.title = title
  if (description) product.description = description
  if (image) product.image = image
  if (price) product.price = price
  if (inventory) product.inventory = inventory
  if (statusId) product.statusId = statusId
  if (categoryId) product.categoryId = categoryId
  if (createdAt) product.createdAt = createdAt
  if (updatedAt) product.updatedAt = updatedAt

  return product
}

/**
 * Maps props into an User.
 * @param {Object} props props
 * @param {integer=} props.id user's id
 * @param {string=} props.firstName user's firstName
 * @param {string=} props.lastName user's lastName
 * @param {string=} props.email user's email
 * @param {datetime=} props.createdAt created at
 * @param {datetime=} props.updatedAt updated at
 * @returns {User} user
 */
const mapUser = ({ id, firstName, lastName, email, createdAt, updatedAt }) => {
  const user = {}
  if (id) user.id = id
  if (firstName) user.firstName = firstName
  if (lastName) user.lastName = lastName
  if (email) user.email = email
  if (createdAt) user.createdAt = createdAt
  if (updatedAt) user.updatedAt = updatedAt

  return user
}

module.exports = {
  mapCategory,
  mapProduct,
  mapUser,
}
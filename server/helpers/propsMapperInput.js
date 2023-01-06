require('../models/entity')
/**
 * Map props into a Category.
 * @param {Object} props props
 * @param {string=} props.title title
 * @returns {Category} mapped category
 */
const mapCategory = ({ title }) => {
  const category = {}
  if (title) category.title = title

  return category
}

/**
 * Map props into a Product.
 * @param {Object} props props
 * @param {string=} props.title product's title
 * @param {string=} props.description product's description
 * @param {string=} props.image product's image url
 * @param {number=} props.price product's price
 * @param {number=} props.invetory product's inventory
 * @param {number=} props.statusId product's statusId
 * @param {number=} props.categoryId product's categoryId
 * @returns {Product} mapped product
 */
const mapProduct = ({
  title,
  description,
  image,
  price,
  inventory,
  statusId,
  categoryId,
}) => {
  const product = {}
  if (title) product.title = title
  if (description) product.description = description
  if (image) product.image = image
  if (price) product.price = price
  if (inventory) product.inventory = inventory
  if (statusId) product.statusId = statusId
  if (categoryId) product.categoryId = categoryId

  return product
}

/**
 * Maps props into an User.
 * @param {Object} props props
 * @param {string=} props.firstName user's firstName
 * @param {string=} props.lastName user's lastName
 * @param {string=} props.email user's email
 * @param {string=} props.password user's password
 * @returns {User} user
 */
const mapUser = ({ firstName, lastName, email, password }) => {
  const user = {}
  if (firstName) user.firstName = firstName
  if (lastName) user.lastName = lastName
  if (email) user.email = email
  if (password) user.password = password

  return user
}

const mapOrderItem = ({ productId, price, total, subtotal, quantity }) => {
  const item = {}
  item.productId = productId
  if (price) item.price = price
  if (total) item.total = total
  if (subtotal) item.subtotal = subtotal
  item.quantity = quantity
  return item
}

const mapOrder = ({
  items,
  total,
  subtotal,
  paymentStatus,
  paymentStatusId,
  shippingAddress,
  dateOrder,
}) => {
  const order = {}
  if (items) order.items = items.map(mapOrderItem)
  if (total) order.total = total
  if (subtotal) order.subtotal = subtotal
  if (paymentStatus) order.paymentStatus = paymentStatus
  if (paymentStatusId) order.paymentStatusId = paymentStatusId
  if (shippingAddress) order.shippingAddress = shippingAddress
  if (dateOrder) order.dateOrder = dateOrder
  return order
}

const mapShippingAddress = ({
  addressLine1,
  addressLine2,
  city,
  country,
  state,
  postalCode,
}) => {
  const addr = {}
  if (addressLine1) addr.addressLine1 = addressLine1
  if (addressLine2) addr.addressLine2 = addressLine2
  if (city) addr.city = city
  if (country) addr.country = country
  if (state) addr.state = state
  if (postalCode) addr.postalCode = postalCode
  return addr
}

module.exports = {
  mapCategory,
  mapProduct,
  mapUser,
  mapOrder,
  mapShippingAddress,
}

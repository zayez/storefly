const BASE_URL = ''

const POST_SIGN_IN = `${BASE_URL}/signin`
const POST_SIGN_UP = `${BASE_URL}/signup`
const GET_SIGN_OUT = `${BASE_URL}/signout`
const GET_ROOT = `${BASE_URL}/`
const GET_USER_LOGGED = `${BASE_URL}/user`

// Products
const PRODUCTS = `${BASE_URL}/products`
const POST_PRODUCT = `${PRODUCTS}`
const POST_PRODUCT_COLLECTION = `${PRODUCTS}/collections`
const PATCH_PRODUCT = `${PRODUCTS}/:id`
const DELETE_PRODUCT = `${PRODUCTS}/:id`
const GET_PRODUCT = `${PRODUCTS}/:id`
const GET_PRODUCTS = `${PRODUCTS}`

const PRODUCT_STATUSES = `${BASE_URL}/productStatuses`
const GET_PRODUCT_STATUSES = `${PRODUCT_STATUSES}`

// Categories
const CATEGORIES = `${BASE_URL}/categories`
const POST_CATEGORY = `${CATEGORIES}`
const PATCH_CATEGORY = `${CATEGORIES}/:id`
const DELETE_CATEGORY = `${CATEGORIES}/:id`
const GET_CATEGORY = `${CATEGORIES}/:id`
const GET_CATEGORIES = `${CATEGORIES}`

// Users
const USERS = `${BASE_URL}/users`
const POST_USER = `${USERS}`
const PATCH_USER = `${USERS}/:id`
const DELETE_USER = `${USERS}/:id`
const GET_USER = `${USERS}/:id`
const GET_USERS = `${USERS}`

const ORDERS = `${BASE_URL}/orders`
const POST_ORDER = `${ORDERS}`
const GET_ORDER = `${ORDERS}/:id`
const GET_ORDERS = `${ORDERS}`

const STRIPE_CHECKOUT = `${BASE_URL}/stripe-checkout`
const POST_STRIPE_CHECKOUT = `${STRIPE_CHECKOUT}`
const GET_STRIPE_CHECKOUT = `${STRIPE_CHECKOUT}`

// GET USER ORDERS
const GET_USER_ORDERS = `${USERS}/:userId/orders`
const GET_USER_ORDER = `${USERS}/:userId/orders/:orderId`

/**
 * Enum for API endpoints.
 * @readonly
 * @enum {string}
 */
const EndpointUrls = {
  /** @member {string} */
  POST_SIGN_IN,
  /** @member {string} */
  POST_SIGN_UP,
  /** @member {string} */
  GET_SIGN_OUT,
  /** @member {string} */
  GET_ROOT,
  /** @member {string} */
  GET_USER_LOGGED,
  /** @member {string} */
  PRODUCTS,
  /** @member {string} */
  CATEGORIES,
  /** @member {string} */
  USERS,
  /** @member {string} */
  ORDERS,
  /** @member {string} */
  POST_PRODUCT,
  /** @member {string} */
  POST_PRODUCT_COLLECTION,
  /** @member {string} */
  PATCH_PRODUCT,
  /** @member {string} */
  DELETE_PRODUCT,
  /** @member {string} */
  GET_PRODUCT,
  /** @member {string} */
  GET_PRODUCTS,
  /** @member {string} */
  PRODUCT_STATUSES,
  /** @member {string} */
  GET_PRODUCT_STATUSES,
  /** @member {string} */
  POST_CATEGORY,
  /** @member {string} */
  PATCH_CATEGORY,
  /** @member {string} */
  DELETE_CATEGORY,
  /** @member {string} */
  GET_CATEGORY,
  /** @member {string} */
  GET_CATEGORIES,
  /** @member {string} */
  POST_USER,
  /** @member {string} */
  PATCH_USER,
  /** @member {string} */
  DELETE_USER,
  /** @member {string} */
  GET_USER,
  /** @member {string} */
  GET_USERS,
  /** @member {string} */
  USERS,
  /** @member {string} */
  POST_ORDER,
  /** @member {string} */
  GET_ORDERS,
  /** @member {string} */
  GET_ORDER,
  /** @member {string} */
  GET_USER_ORDERS,
  /** @member {string} */
  GET_USER_ORDER,

  /** @member {string} */
  POST_STRIPE_CHECKOUT,
  /** @member {string} */
  GET_STRIPE_CHECKOUT,
}

module.exports = EndpointUrls

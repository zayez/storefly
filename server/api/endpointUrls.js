const BASE_URL = ''

const PRODUCTS = `${BASE_URL}/products`
const POST_PRODUCT = `${PRODUCTS}`
const POST_PRODUCT_COLLECTION = `${PRODUCTS}/collections`
const PATCH_PRODUCT = `${PRODUCTS}/:id`
const DELETE_PRODUCT = `${PRODUCTS}/:id`
const GET_PRODUCT = `${PRODUCTS}/:id`
const GET_PRODUCTS = `${PRODUCTS}`

const CATEGORIES = `${BASE_URL}/categories`
const POST_CATEGORY = `${CATEGORIES}`
const PATCH_CATEGORY = `${CATEGORIES}/:id`
const DELETE_CATEGORY = `${CATEGORIES}/:id`
const GET_CATEGORY = `${CATEGORIES}/:id`
const GET_CATEGORIES = `${CATEGORIES}`

const USERS = `${BASE_URL}/users`
const POST_USER = `${USERS}`

const POST_SIGN_IN = `${BASE_URL}/signin`
const POST_SIGN_UP = `${BASE_URL}/signup`

const GET_ROOT = `${BASE_URL}/`

/**
 * Enum for API endpoints.
 * @readonly
 * @enum {string}
 */
const EndpointUrls = {
  /** @member {string} */
  PRODUCTS,
  /** @member {string} */
  CATEGORIES,
  /** @member {string} */
  USERS,
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
  POST_SIGN_IN,
  /** @member {string} */
  POST_SIGN_UP,
  /** @member {string} */
  GET_ROOT,
}

module.exports = EndpointUrls

/**
 * @typedef {object} User User
 * @property {integer=} id user id
 * @property {string=} email user email
 * @property {string=} firstName user first name
 * @property {string=} lastName user last name
 * @property {string=} password user password
 */

/**
 * @typedef {object} Category Category
 * @property {integer=} id category id
 * @property {string=} title category title
 */

/**
 * @typedef {object} Product Category
 * @property {integer=} id product id
 * @property {string=} title product title
 * @property {string=} description product description
 * @property {string=} image image url
 * @property {integer=} price product price
 * @property {integer=} inventory product inventory
 * @property {integer=} statusId product statusId
 * @property {integer=} categoryId product categoryId
 *
 */

/**
 * @typedef {object} Entity Entity
 * @property {(User|Category|Product)} entity entity
 */

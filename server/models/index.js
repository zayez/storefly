/**
 * @typedef {object} User User
 * @property {number=} id user id
 * @property {string=} email user email
 * @property {string=} firstName user first name
 * @property {string=} lastName user last name
 * @property {string=} password user password
 */

/**
 * @typedef {object} Category Category
 * @property {number=} id category id
 * @property {string=} title category title
 */

/**
 * @typedef {object} Product product
 * @property {number=} id product id
 * @property {string=} title product title
 * @property {string=} description product description
 * @property {string=} image image url
 * @property {number=} price product price
 * @property {number=} inventory product inventory
 * @property {number=} statusId product statusId
 * @property {number=} categoryId product categoryId
 *
 */

/**
 * @typedef {object} ProductStatus product status
 * @property {number=} id the id
 * @property {string=} name the status name
 *
 */

/**
 * @typedef {object} Entity Entity
 * @property {(User|Category|Product|ProductStatus)} entity entity
 */

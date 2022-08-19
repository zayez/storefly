const path = require('path')
const request = require('supertest')
const server = require('../../../server')
const STATUS = require('../../../types/StatusCode')
const agent = request.agent(server)

/**
 * @typedef {object} RequestOptions options
 * @property {string=} token The authentication token
 * @property {STATUS} status The expected status response
 */

/**
 *
 * @param {string} token token
 * @param {Object[]} headers headers to set
 * @returns {Object[]} headers
 */
const setHeaders = (token, headers) => {
  const newHeaders = headers ? headers : {}
  if (!headers) newHeaders['Accept'] = 'application/json'
  if (token) newHeaders['Authorization'] = token
  return newHeaders
}

/**
 * Debug response body in case response status does not match with expected status
 * @param {Response} res response
 * @param {STATUS} expectedStatus expected status
 */
const debugStatus = async (res, expectedStatus) => {
  if (res.status !== expectedStatus) {
    console.log(JSON.stringify(res.body, null, 2))
  }
}

module.exports = (baseUrl = '', endpoint) => {
  const url = `${baseUrl}/${endpoint}`
  /**
   * Submits a POST with the entity.
   * @param {object} entity entity object to create
   * @param {RequestOptions} opts options
   * @returns {Response} response
   */
  const create = async (entity, { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .post(`${url}`)
      .send(entity)
      .set(headers)
      .expect('Content-Type', /json/)
      .expect((res) => debugStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  /**
   * Submits a POST to collections with the entities.
   * @param {object} entities entities to create
   * @param {RequestOptions} opts options
   * @returns {Response} response
   */
  const createAll = async (entities, { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .post(`${url}/collections`)
      .send(entities)
      .set(headers)
      .expect('Content-Type', /json/)
      .expect((res) => debugStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  /**
   * Submits a PATCH with entity
   * @param {integer} id entity id to update
   * @param {object} entity entity values to update
   * @param {RequestOptions} opts options
   * @returns {Response} response
   */
  const update = async (id, entity, { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .patch(`${url}/${id}`)
      .send(entity)
      .set(headers)
      .set('Authorization', token)
      .expect('Content-Type', /json/)
      .expect((res) => debugStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  /**
   * Submits a DELETE to entity with id
   * @param {integer} id entity id
   * @param {RequestOptions} opts options
   * @returns {Response} response
   */
  const destroy = async (id, { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .delete(`${url}/${id}`)
      .set(headers)
      .expect('Content-Type', /json/)
      .expect((res) => debugStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  /**
   * Submits a GET to entity with id
   * @param {integer} id entity id
   * @param {RequestOptions} opts options
   * @returns {Response} response
   */
  const getOne = async (id, { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .get(`${url}/${id}`)
      .set(headers)
      .expect('Content-Type', /json/)
      .expect((res) => debugStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  /**
   * Submits a GET with a query parameter
   * @param {string} query query
   * @param {RequestOptions} opts options
   * @returns {Response} response
   */
  const get = async (query = '', { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .get(`${url}${query}`)
      .set(headers)
      .expect('Content-Type', /json/)
      .expect((res) => debugStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  /**
   * Submits a GET with no query
   * @param {RequestOptions} opts options
   * @returns {Response} response
   */
  const getAll = async (opts) => {
    return await get('', opts)
  }

  return {
    agent,
    server,
    create,
    createAll,
    update,
    destroy,
    getOne,
    get,
    getAll,
  }
}

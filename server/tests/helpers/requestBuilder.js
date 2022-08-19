const request = require('supertest')
const server = require('../../server')
const STATUS = require('../../types/StatusCode')
const agent = request.agent(server)

const { setHeaders, debugStatus } = require('../helpers/requestHelpers')

/**
 * @typedef {object} RequestOptions options
 * @property {string=} token The authentication token
 * @property {STATUS} status The expected status response
 */

/**
 * @typedef {object} RequestBuilder options
 * @property {Server} server server
 * @property {request.SuperAgentTest} agent supertest agent
 * @property {(entity:object, opts:RequestOptions)=>Response} create POST request
 * @property {(entities:Object[], opts:RequestOptions)=>Response} createAll POST request
 * @property {(id:integer, entity:Object, opts:RequestOptions) => Response} update PATCH request
 * @property {(id:integer, opts:RequestOptions) => Response} destroy DELETE request
 * @property {(id:integer, opts:RequestOptions) => Response} getOne GET with :id request
 * @property {(query:string, opts:RequestOptions) => Response} get GET with query request
 * @property {(opts:RequestOptions) => Response} getAll GET request
 */

/**
 *
 * @param {string} endpoint endpoint
 * @param {string} baseUrl base url
 * @returns {RequestBuilder} request builder
 */
module.exports = (endpoint, baseUrl = '') => {
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

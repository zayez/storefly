const path = require('path')
const request = require('supertest')
const server = require('../../../server')
const STATUS = require('../../../types/StatusCode')
const agent = request.agent(server)

const setHeaders = (token) => {
  const headers = {}
  // headers['Accept'] = 'application/json'
  if (token) headers['Authorization'] = token
  return headers
}

const checkStatus = async (res, status) => {
  if (res.status !== status) {
    console.log(JSON.stringify(res.body, null, 2))
  }
}

module.exports = (baseUrl = '', endpoint) => {
  const url = `${baseUrl}/${endpoint}`
  /**
   * Submits a POST with the entity.
   * @param {object} entity Entity object to create.
   * @param {object} params token and status.
   * @returns
   */
  const create = async (entity, { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .post(`${url}`)
      .send(entity)
      .set(headers)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => checkStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  const update = async (id, entity, { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .patch(`${url}/${id}`)
      .send(entity)
      .set(headers)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => checkStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  const destroy = async (id, { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .delete(`${url}/${id}`)
      .set(headers)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => checkStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  /**
   * @typedef {object} RequestOptions
   * @property {string=} token The authentication token
   * @property {STATUS} status The expected statuc code response
   */
  /**
   *
   * @param {integer} id
   * @param {RequestOptions} options
   * @returns
   */
  const getOne = async (id, { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .get(`${url}/${id}`)
      .set(headers)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => checkStatus(res, status))
      .expect(status)
      .then((res) => res)
  }

  const get = async (query = '', { token, status }) => {
    const headers = setHeaders(token)
    return await agent
      .get(`${url}${query}`)
      .set(headers)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => checkStatus(res, status))
      .expect(status)
      .then((res) => res)
  }
  const getAll = async (requestOptions) => {
    return await get('', requestOptions)
  }

  return {
    agent,
    server,
    create,
    update,
    destroy,
    getOne,
    get,
    getAll,
  }
}

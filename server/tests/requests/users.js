const { setHeaders, debugStatus } = require('../helpers/requestHelpers')
const { USERS, POST_SIGN_IN, POST_SIGN_UP } = require('../../api/endpointUrls')
const requests = require('../helpers/requestBuilder')(USERS)
const agent = requests.agent

const signIn = async (email, password, { status }) => {
  const headers = setHeaders()
  return await agent
    .post(POST_SIGN_IN)
    .send({ email: email, password: password })
    .set(headers)
    .expect('Content-Type', /json/)
    .expect((res) => debugStatus(res, status))
    .expect(status)
    .then((res) => res)
}

const signUp = async (user, { status }) => {
  const headers = setHeaders()
  return await agent
    .post(POST_SIGN_UP)
    .send(user)
    .set(headers)
    .expect('Content-Type', /json/)
    .expect((res) => debugStatus(res, status))
    .expect(status)
    .then((res) => res)
}

module.exports = {
  ...requests,
  signIn,
  signUp,
}

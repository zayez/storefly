const { setHeaders, debugStatus } = require('../helpers/requestHelpers')
const requests = require('../helpers/requestBuilder')('users')
const agent = requests.agent

const signIn = async (email, password, { status }) => {
  const headers = setHeaders()
  return await agent
    .post(`/signin`)
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
    .post(`/signup`)
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

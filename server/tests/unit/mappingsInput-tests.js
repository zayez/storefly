const test = require('tape')
const mapper = require('../../helpers/propsMapper').input

test('setup', async (t) => {
  t.end()
})

test('should be able to map props to an entity', (t) => {
  const catA1 = { title: 'a title' }
  const catA2 = mapper.mapCategory(catA1)
  t.equal(catA1.title, catA2.title)

  const catB1 = {}
  const catB2 = mapper.mapCategory(catB1)
  t.equal(catB1.title, undefined)

  const prodA1 = { title: 'Porsche 911', description: 'A car' }
  const prodA2 = mapper.mapProduct(prodA1)
  t.equal(prodA1.title, prodA2.title)
  t.equal(prodA1.image, undefined)

  const userA1 = { firstName: 'Jesse', lastName: 'Cox' }
  const userA2 = mapper.mapUser(userA1)
  t.equal(userA1.firstName, userA2.firstName)
  t.end()
})

test('teardown', async (t) => {
  t.end()
})

const test = require('tape')
const knex = require('../../db')
const categories = require('../fixtures/categories.json').categories
const STATUS = require('../../types/StatusCode')
const { logAdmin } = require('../infrastructure/login')
const { server, create, update, destroy, getOne, get, getAll } =
  require('./helpers/integrationHelper')('', 'categories')

test('setup', async (t) => {
  t.end()
})

test('[clean db] As admin I should:', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run()

    token = await logAdmin()
    assert.end()
  })

  t.test('be able to create a category', async (assert) => {
    const category = { title: 'Books' }

    const res = await create(category, {
      token,
      status: STATUS.Created,
    })

    assert.equal(res.body.title, 'Created', 'Category created')
    assert.equal(res.body.category.title, 'Books')
    assert.end()
  })

  t.test('be able to update a category', async (assert) => {
    const categoryCreate = { title: 'Eletroniks' }
    const resCreate = await create(categoryCreate, {
      token,
      status: STATUS.Created,
    })
    const categoryUpdate = { title: 'Eletronics' }
    const resUpdate = await update(resCreate.body.category.id, categoryUpdate, {
      token,
      status: STATUS.Ok,
    })
    const resCat = resUpdate.body.category

    assert.equal(resUpdate.body.title, 'Ok', 'Category updated')
    assert.equal(resCat.title, 'Eletronics')
    assert.end()
  })

  t.test(
    "NOT be able to update a category that don't exists",
    async (assert) => {
      const category = { title: 'Hardware' }
      const res = await update(23434, category, {
        token,
        status: STATUS.NotFound,
      })
      assert.equal(res.body.title, 'Not Found', 'title is a match')
      assert.end()
    },
  )

  t.test('be able to delete a category', async (assert) => {
    const category = { title: 'Beverages' }
    const resCreate = await create(category, { token, status: STATUS.Created })
    const catCreated = resCreate.body.category
    const res = await destroy(catCreated.id, { token, status: STATUS.Ok })
    assert.equal(res.body.title, 'Ok', 'Category deleted')
    assert.end()
  })

  t.test(
    'NOT be able to retrieve category with id as string',
    async (assert) => {
      const category = { title: 'Clothes' }
      const resCreate = await create(category, {
        token,
        status: STATUS.Created,
      })
      const resCat = resCreate.body.category
      const res = await getOne('clothes', { token, status: STATUS.BadRequest })
      assert.equal(res.status, STATUS.BadRequest)
      assert.end()
    },
  )

  t.test('be able to retrieve a category', async (assert) => {
    const category = { title: 'Cars' }
    const resCreate = await create(category, { token, status: STATUS.Created })
    const catCreated = resCreate.body.category

    const res = await getOne(catCreated.id, { token, status: STATUS.Ok })
    assert.equal(res.body.title, 'Ok', 'Category retrieved')
    assert.equal(res.body.category.title, 'Cars', 'equal name')
    assert.end()
  })

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })

  t.end()
})

test('[seeded db] As admin I should', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })

    token = await logAdmin()
    assert.end()
  })

  t.test('NOT be able to create a category that exists', async (assert) => {
    const category = { ...categories[0] }
    delete category.id
    const res = await create(category, { token, status: STATUS.Conflict })
    assert.equal(res.body.title, 'Conflict', 'Category alreadly exists')
    assert.end()
  })

  t.test('be able to retrieve a category', async (assert) => {
    const category = categories[1]
    const res = await getOne(category.id, { token, status: STATUS.Ok })
    assert.equal(res.body.title, 'Ok', 'Category retrieved')
    assert.equal(res.body.category.title, 'Eletronics', 'equal name')
    assert.end()
  })

  t.test('be able to retrieve all categories', async (assert) => {
    const res = await getAll({ token, status: STATUS.Ok })
    assert.equal(res.body.title, 'Ok', 'Category retrieved')
    assert.ok(Array.isArray(res.body.categories))
    assert.end()
  })

  t.test(
    'NOT be able to retrieve categories with page query as string',
    async (assert) => {
      const queryString = '?page=one'
      const res = await get(queryString, { token, status: STATUS.BadRequest })
      assert.end()
    },
  )

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })
})

test('teardown', async (t) => {
  await server.close()
  t.end()
})

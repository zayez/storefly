const test = require('tape')
const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const knex = require('../../db')
const categoriesFix = require('../fixtures/categories.json').categories
const STATUS = require('../../types/StatusCode')
const { logAdmin } = require('../infrastructure/login')

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

  t.test('be able to create a category', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: 'Books',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        assert.equal(res.body.title, 'Created', 'Category created')
        assert.equal(res.body.category.title, 'Books')
        assert.end()
      })
  })

  t.test('be able to update a category', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: 'Eletroniks',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        const categoryId = res.body.category.id
        agent
          .patch(`/categories/${categoryId}`)
          .send({
            title: 'Eletronics',
          })
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(STATUS.Ok)
          .then((innerRes) => {
            assert.equal(innerRes.body.title, 'Ok', 'Category updated')
            assert.equal(innerRes.body.category.title, 'Eletronics')
            assert.end()
          })
      })
  })

  t.test("NOT be able to update a category that don't exists", (assert) => {
    agent
      .patch(`/categories/200`)
      .send({
        title: 'Hardware',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.NotFound)
      .then((innerRes) => {
        assert.equal(innerRes.body.title, 'Not Found', 'title is a match')
        assert.end()
      })
  })

  t.test('be able to delete a category', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: 'Beverages',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        const categoryId = res.body.category.id
        agent
          .delete(`/categories/${categoryId}`)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(STATUS.Ok)
          .then((innerRes) => {
            assert.equal(innerRes.body.title, 'Ok', 'Category deleted')
            assert.end()
          })
      })
  })

  t.test('NOT be able to retrieve category with id as string', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: 'Clothes',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        agent
          .get(`/categories/clothes`)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(STATUS.BadRequest)
          .then(() => {
            assert.end()
          })
      })
  })

  t.test('be able to retrieve a category', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: 'Cars',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Created)
      .then((res) => {
        const categoryId = res.body.category.id
        agent
          .get(`/categories/${categoryId}`)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(STATUS.Ok)
          .then((innerRes) => {
            assert.equal(innerRes.body.title, 'Ok', 'Category retrieved')
            assert.equal(innerRes.body.category.title, 'Cars', 'equal name')
            assert.end()
          })
      })
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

  t.test('NOT be able to create a category that exists', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: categoriesFix[0].title,
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Conflict)
      .then((res) => {
        assert.equal(res.body.title, 'Conflict', 'Category alreadly exists')
        assert.end()
      })
  })

  t.test('be able to retrieve a category', (assert) => {
    agent
      .get(`/categories/2`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Ok)
      .then((res) => {
        assert.equal(res.body.title, 'Ok', 'Category retrieved')
        assert.equal(res.body.category.title, 'Eletronics', 'equal name')
        assert.end()
      })
  })

  t.test('be able to retrieve all categories', (assert) => {
    agent
      .get(`/categories`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(STATUS.Ok)
      .then((res) => {
        assert.equal(res.body.title, 'Ok', 'Category retrieved')
        assert.ok(Array.isArray(res.body.categories))
        assert.end()
      })
  })

  t.test(
    'NOT be able to retrieve categories with page query as string',
    (assert) => {
      agent
        .get(`/categories?page=one`)
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(STATUS.BadRequest)
        .then((res) => {
          assert.end()
        })
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

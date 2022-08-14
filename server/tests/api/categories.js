const test = require('tape')
const request = require('supertest')
const server = require('../../server')
const agent = request.agent(server)
const knex = require('../../db')

const { logAdmin, logUser } = require('../infrastructure/login')

test('setup', async (t) => {
  t.end()
})

test('[as admin] should be able to create', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run()

    token = await logAdmin()
    assert.end()
  })

  t.test('should be able to create a category', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: 'Books',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        assert.equal(res.body.title, 'Created', 'Category created')
        assert.equal(res.body.category.title, 'Books')
        assert.end()
      })
  })

  t.test('should be able to update a category', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: 'Eletroniks',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        const categoryId = res.body.category.id
        agent
          .put(`/categories`)
          .send({
            id: categoryId,
            title: 'Eletronics',
          })
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((innerRes) => {
            assert.equal(innerRes.body.title, 'Ok', 'Category updated')
            assert.equal(innerRes.body.category.title, 'Eletronics')
            assert.end()
          })
      })
  })

  t.test('should be able to delete a category', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: 'Beverages',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        const categoryId = res.body.category.id
        agent
          .delete(`/categories`)
          .send({
            id: categoryId,
          })
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .then((innerRes) => {
            assert.equal(innerRes.body.title, 'Ok', 'Category deleted')
            assert.end()
          })
      })
  })

  t.test(
    'should not be able to retrieve category with id as string',
    (assert) => {
      agent
        .post(`/categories`)
        .send({
          title: 'Clothes',
        })
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201)
        .then((res) => {
          agent
            .get(`/categories/clothes`)
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .then(() => {
              assert.end()
            })
        })
    },
  )

  t.test('should be able to retrieve a category', (assert) => {
    agent
      .post(`/categories`)
      .send({
        title: 'Cars',
      })
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        const categoryId = res.body.category.id
        agent
          .get(`/categories/${categoryId}`)
          .set('Authorization', token)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
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

test('[as admin] should be able retrieve', (t) => {
  let token

  t.test('setup', async (assert) => {
    await knex.migrate.latest()
    await knex.seed.run({ directory: 'tests/seeds' })

    token = await logAdmin()
    assert.end()
  })

  t.test('should be able to retrieve all categories', (assert) => {
    agent
      .get(`/categories`)
      .set('Authorization', token)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.equal(res.body.title, 'Ok', 'Category retrieved')
        assert.ok(Array.isArray(res.body.categories))
        assert.end()
      })
  })

  t.test(
    'should not be able to retrieve categories with page query as string',
    (assert) => {
      agent
        .get(`/categories?page=one`)
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(400)
        .then((res) => {
          assert.end()
        })
    },
  )

  t.test('teardown', async (assert) => {
    await knex.seed.run()
    assert.end()
  })

  t.end()
})

test('teardown', async (t) => {})

import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import Collection from '#models/collection'
import { randomUUID } from 'node:crypto'

test.group('Collections CRUD', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('creates a collection', async ({ client, assert }) => {
    const response = await client
      .post('/api/collections')
      .json({
        code: 'summer-sale',
        name: 'Summer Sale',
      })
      .send()

    response.assertStatus(201)
    response.assertBodyContains({
      code: 'summer-sale',
      name: 'Summer Sale',
      parentCollectionId: null,
    })

    const body = response.body() as { id: number }
    const savedCollection = await Collection.find(body.id)

    assert.isNotNull(savedCollection)
    assert.equal(savedCollection!.code, 'summer-sale')
    assert.equal(savedCollection!.name, 'Summer Sale')
    assert.isNull(savedCollection!.parentCollectionId)
  })

  test('creates a child collection when parent exists', async ({ client, assert }) => {
    const parentCollection = await Collection.create({
      code: 'parent-collection',
      name: 'Parent Collection',
    })

    const response = await client
      .post('/api/collections')
      .json({
        code: 'child-collection',
        name: 'Child Collection',
        parentCollectionId: parentCollection.id,
      })
      .send()

    response.assertStatus(201)
    response.assertBodyContains({
      code: 'child-collection',
      name: 'Child Collection',
      parentCollectionId: parentCollection.id,
    })

    const body = response.body() as { id: number }
    const savedCollection = await Collection.findOrFail(body.id)

    assert.equal(savedCollection.parentCollectionId, parentCollection.id)
  })

  test('lists collections with q and parentCollectionId filters', async ({ client, assert }) => {
    const token = randomUUID()
    const parentCollection = await Collection.create({
      code: `parent-${token}`,
      name: `Parent ${token}`,
    })

    const matchingChild = await Collection.create({
      code: `match-${token}`,
      name: `Matching ${token}`,
      parentCollectionId: parentCollection.id,
    })

    await Collection.create({
      code: `other-${token}`,
      name: `Other ${token}`,
    })

    const qResponse = await client
      .get('/api/collections')
      .qs({ q: `match-${token}` })
      .send()

    qResponse.assertStatus(200)
    const qBody = qResponse.body() as { data: Array<{ id: number }>; meta: { total: number } }
    assert.isAtLeast(qBody.meta.total, 1)
    assert.equal(qBody.data[0]!.id, matchingChild.id)

    const parentFilterResponse = await client
      .get('/api/collections')
      .qs({ parentCollectionId: parentCollection.id })
      .send()

    parentFilterResponse.assertStatus(200)
    const parentFilterBody = parentFilterResponse.body() as {
      data: Array<{ id: number; parentCollectionId: number | null }>
    }

    assert.isTrue(parentFilterBody.data.some((item) => item.id === matchingChild.id))
    assert.isTrue(
      parentFilterBody.data.every((item) => item.parentCollectionId === parentCollection.id)
    )
  })

  test('shows a collection by id', async ({ client }) => {
    const collection = await Collection.create({
      code: 'show-case',
      name: 'Show Case',
    })

    const response = await client.get(`/api/collections/${collection.id}`).send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: collection.id,
      code: 'show-case',
      name: 'Show Case',
      parentCollectionId: null,
    })
  })

  test('updates a collection', async ({ client, assert }) => {
    const parentCollection = await Collection.create({
      code: 'parent-update',
      name: 'Parent Update',
    })
    const collection = await Collection.create({
      code: 'before-update',
      name: 'Before Update',
    })

    const response = await client
      .put(`/api/collections/${collection.id}`)
      .json({
        code: 'after-update',
        name: 'After Update',
        parentCollectionId: parentCollection.id,
      })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: collection.id,
      code: 'after-update',
      name: 'After Update',
      parentCollectionId: parentCollection.id,
    })

    await collection.refresh()
    assert.equal(collection.code, 'after-update')
    assert.equal(collection.name, 'After Update')
    assert.equal(collection.parentCollectionId, parentCollection.id)
  })

  test('rejects invalid parent references and self-parent on update', async ({ client }) => {
    const collection = await Collection.create({
      code: 'invalid-parent-target',
      name: 'Invalid Parent Target',
    })

    const invalidParentResponse = await client
      .post('/api/collections')
      .json({
        code: 'bad-child',
        name: 'Bad Child',
        parentCollectionId: 99999999,
      })
      .send()

    invalidParentResponse.assertStatus(422)

    const selfParentResponse = await client
      .put(`/api/collections/${collection.id}`)
      .json({
        parentCollectionId: collection.id,
      })
      .send()

    selfParentResponse.assertStatus(422)
  })

  test('deletes a collection', async ({ client, assert }) => {
    const collection = await Collection.create({
      code: 'to-delete',
      name: 'To Delete',
    })

    const response = await client.delete(`/api/collections/${collection.id}`).send()

    response.assertStatus(204)

    const deletedCollection = await Collection.find(collection.id)
    assert.isNull(deletedCollection)
  })
})

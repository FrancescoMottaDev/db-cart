import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import StockLocation from '#models/stock_location'
import { randomUUID } from 'node:crypto'

test.group('Stock Locations CRUD', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('creates a stock location', async ({ client, assert }) => {
    const response = await client
      .post('/api/stock-locations')
      .json({
        name: 'Main Warehouse',
        shippingPriority: 10,
      })
      .send()

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Main Warehouse',
      shippingPriority: 10,
    })

    const body = response.body() as { id: number }
    const savedStockLocation = await StockLocation.find(body.id)

    assert.isNotNull(savedStockLocation)
    assert.equal(savedStockLocation!.name, 'Main Warehouse')
    assert.equal(savedStockLocation!.shippingPriority, 10)
  })

  test('creates a stock location with null shipping priority by default', async ({
    client,
    assert,
  }) => {
    const response = await client
      .post('/api/stock-locations')
      .json({
        name: 'Overflow Warehouse',
      })
      .send()

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Overflow Warehouse',
      shippingPriority: null,
    })

    const body = response.body() as { id: number }
    const savedStockLocation = await StockLocation.findOrFail(body.id)
    assert.isNull(savedStockLocation.shippingPriority)
  })

  test('lists stock locations with q and shippingPriority filters', async ({ client, assert }) => {
    const token = randomUUID()
    const matchingStockLocation = await StockLocation.create({
      name: `warehouse-${token}`,
      shippingPriority: 5,
    })

    await StockLocation.create({
      name: `backup-${token}`,
      shippingPriority: 10,
    })

    const qResponse = await client
      .get('/api/stock-locations')
      .qs({
        q: `warehouse-${token}`,
      })
      .send()

    qResponse.assertStatus(200)
    const qBody = qResponse.body() as {
      data: Array<{ id: number; name: string }>
      meta: { total: number }
    }

    assert.isAtLeast(qBody.meta.total, 1)
    assert.isTrue(qBody.data.some((item) => item.id === matchingStockLocation.id))
    assert.isTrue(qBody.data.every((item) => item.name.includes(`warehouse-${token}`)))

    const priorityResponse = await client
      .get('/api/stock-locations')
      .qs({
        shippingPriority: 5,
      })
      .send()

    priorityResponse.assertStatus(200)
    const priorityBody = priorityResponse.body() as {
      data: Array<{ id: number; shippingPriority: number | null }>
    }

    assert.isTrue(priorityBody.data.some((item) => item.id === matchingStockLocation.id))
    assert.isTrue(priorityBody.data.every((item) => item.shippingPriority === 5))
  })

  test('shows a stock location by id', async ({ client }) => {
    const stockLocation = await StockLocation.create({
      name: 'Secondary Warehouse',
      shippingPriority: 20,
    })

    const response = await client.get(`/api/stock-locations/${stockLocation.id}`).send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: stockLocation.id,
      name: 'Secondary Warehouse',
      shippingPriority: 20,
    })
  })

  test('updates a stock location and can null shipping priority', async ({ client, assert }) => {
    const stockLocation = await StockLocation.create({
      name: 'Before Update',
      shippingPriority: 30,
    })

    const response = await client
      .put(`/api/stock-locations/${stockLocation.id}`)
      .json({
        name: 'After Update',
        shippingPriority: null,
      })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: stockLocation.id,
      name: 'After Update',
      shippingPriority: null,
    })

    await stockLocation.refresh()
    assert.equal(stockLocation.name, 'After Update')
    assert.isNull(stockLocation.shippingPriority)
  })

  test('rejects invalid stock location payload', async ({ client }) => {
    const response = await client
      .post('/api/stock-locations')
      .json({
        name: '',
        shippingPriority: -1,
      })
      .send()

    response.assertStatus(422)
  })

  test('deletes a stock location', async ({ client, assert }) => {
    const stockLocation = await StockLocation.create({
      name: 'To Delete',
      shippingPriority: 1,
    })

    const response = await client.delete(`/api/stock-locations/${stockLocation.id}`).send()

    response.assertStatus(204)
    assert.isNull(await StockLocation.find(stockLocation.id))
  })
})

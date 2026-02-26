import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import ShippingCategory from '#models/shipping_category'
import { randomUUID } from 'node:crypto'

test.group('Shipping Categories CRUD', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('creates a shipping category', async ({ client, assert }) => {
    const response = await client
      .post('/api/shipping-categories')
      .json({
        name: 'Standard Shipping',
      })
      .send()

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Standard Shipping',
    })

    const body = response.body() as { id: number }
    const savedShippingCategory = await ShippingCategory.find(body.id)

    assert.isNotNull(savedShippingCategory)
    assert.equal(savedShippingCategory!.name, 'Standard Shipping')
  })

  test('lists shipping categories with q filter', async ({ client, assert }) => {
    const token = randomUUID()
    const matchingShippingCategory = await ShippingCategory.create({
      name: `express-${token}`,
    })

    await ShippingCategory.create({
      name: `standard-${token}`,
    })

    const response = await client
      .get('/api/shipping-categories')
      .qs({
        q: `express-${token}`,
      })
      .send()

    response.assertStatus(200)
    const body = response.body() as {
      data: Array<{ id: number; name: string }>
      meta: { total: number }
    }

    assert.isAtLeast(body.meta.total, 1)
    assert.isTrue(body.data.some((item) => item.id === matchingShippingCategory.id))
    assert.isTrue(body.data.every((item) => item.name.includes(`express-${token}`)))
  })

  test('shows a shipping category by id', async ({ client }) => {
    const shippingCategory = await ShippingCategory.create({
      name: 'Express',
    })

    const response = await client.get(`/api/shipping-categories/${shippingCategory.id}`).send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: shippingCategory.id,
      name: 'Express',
    })
  })

  test('updates a shipping category', async ({ client, assert }) => {
    const shippingCategory = await ShippingCategory.create({
      name: 'Before Update',
    })

    const response = await client
      .put(`/api/shipping-categories/${shippingCategory.id}`)
      .json({
        name: 'After Update',
      })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: shippingCategory.id,
      name: 'After Update',
    })

    await shippingCategory.refresh()
    assert.equal(shippingCategory.name, 'After Update')
  })

  test('rejects invalid shipping category payload', async ({ client }) => {
    const response = await client
      .post('/api/shipping-categories')
      .json({
        name: '',
      })
      .send()

    response.assertStatus(422)
  })

  test('deletes a shipping category', async ({ client, assert }) => {
    const shippingCategory = await ShippingCategory.create({
      name: 'To Delete',
    })

    const response = await client.delete(`/api/shipping-categories/${shippingCategory.id}`).send()

    response.assertStatus(204)
    assert.isNull(await ShippingCategory.find(shippingCategory.id))
  })
})

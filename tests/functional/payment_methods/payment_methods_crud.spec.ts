import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import PaymentMethod from '#models/payment_method'
import { randomUUID } from 'node:crypto'

test.group('Payment Methods CRUD', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('creates a payment method', async ({ client, assert }) => {
    const response = await client
      .post('/api/payment-methods')
      .json({
        name: 'Credit Card',
      })
      .send()

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'Credit Card',
    })

    const body = response.body() as { id: number }
    const savedPaymentMethod = await PaymentMethod.find(body.id)

    assert.isNotNull(savedPaymentMethod)
    assert.equal(savedPaymentMethod!.name, 'Credit Card')
  })

  test('lists payment methods with q filter', async ({ client, assert }) => {
    const token = randomUUID()
    const matchingPaymentMethod = await PaymentMethod.create({
      name: `card-${token}`,
    })

    await PaymentMethod.create({
      name: `cash-${token}`,
    })

    const response = await client
      .get('/api/payment-methods')
      .qs({
        q: `card-${token}`,
      })
      .send()

    response.assertStatus(200)
    const body = response.body() as {
      data: Array<{ id: number; name: string }>
      meta: { total: number }
    }

    assert.isAtLeast(body.meta.total, 1)
    assert.isTrue(body.data.some((item) => item.id === matchingPaymentMethod.id))
    assert.isTrue(body.data.every((item) => item.name.includes(`card-${token}`)))
  })

  test('shows a payment method by id', async ({ client }) => {
    const paymentMethod = await PaymentMethod.create({
      name: 'Bank Transfer',
    })

    const response = await client.get(`/api/payment-methods/${paymentMethod.id}`).send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: paymentMethod.id,
      name: 'Bank Transfer',
    })
  })

  test('updates a payment method', async ({ client, assert }) => {
    const paymentMethod = await PaymentMethod.create({
      name: 'Before Update',
    })

    const response = await client
      .put(`/api/payment-methods/${paymentMethod.id}`)
      .json({
        name: 'After Update',
      })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: paymentMethod.id,
      name: 'After Update',
    })

    await paymentMethod.refresh()
    assert.equal(paymentMethod.name, 'After Update')
  })

  test('rejects invalid payment method payload', async ({ client }) => {
    const response = await client
      .post('/api/payment-methods')
      .json({
        name: '',
      })
      .send()

    response.assertStatus(422)
  })

  test('deletes a payment method', async ({ client, assert }) => {
    const paymentMethod = await PaymentMethod.create({
      name: 'To Delete',
    })

    const response = await client.delete(`/api/payment-methods/${paymentMethod.id}`).send()

    response.assertStatus(204)
    assert.isNull(await PaymentMethod.find(paymentMethod.id))
  })
})

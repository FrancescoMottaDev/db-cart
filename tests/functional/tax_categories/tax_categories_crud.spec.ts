import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import TaxCategory from '#models/tax_category'
import { randomUUID } from 'node:crypto'

test.group('Tax Categories CRUD', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('creates a tax category', async ({ client, assert }) => {
    const response = await client
      .post('/api/tax-categories')
      .json({
        name: 'VAT 22%',
      })
      .send()

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'VAT 22%',
    })

    const body = response.body() as { id: number }
    const savedTaxCategory = await TaxCategory.find(body.id)

    assert.isNotNull(savedTaxCategory)
    assert.equal(savedTaxCategory!.name, 'VAT 22%')
  })

  test('lists tax categories with q filter', async ({ client, assert }) => {
    const token = randomUUID()
    const matchingTaxCategory = await TaxCategory.create({
      name: `vat-${token}`,
    })

    await TaxCategory.create({
      name: `reduced-${token}`,
    })

    const response = await client
      .get('/api/tax-categories')
      .qs({
        q: `vat-${token}`,
      })
      .send()

    response.assertStatus(200)
    const body = response.body() as {
      data: Array<{ id: number; name: string }>
      meta: { total: number }
    }

    assert.isAtLeast(body.meta.total, 1)
    assert.isTrue(body.data.some((item) => item.id === matchingTaxCategory.id))
    assert.isTrue(body.data.every((item) => item.name.includes(`vat-${token}`)))
  })

  test('shows a tax category by id', async ({ client }) => {
    const taxCategory = await TaxCategory.create({
      name: 'Standard VAT',
    })

    const response = await client.get(`/api/tax-categories/${taxCategory.id}`).send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: taxCategory.id,
      name: 'Standard VAT',
    })
  })

  test('updates a tax category', async ({ client, assert }) => {
    const taxCategory = await TaxCategory.create({
      name: 'Before Update',
    })

    const response = await client
      .put(`/api/tax-categories/${taxCategory.id}`)
      .json({
        name: 'After Update',
      })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: taxCategory.id,
      name: 'After Update',
    })

    await taxCategory.refresh()
    assert.equal(taxCategory.name, 'After Update')
  })

  test('rejects invalid tax category payload', async ({ client }) => {
    const response = await client
      .post('/api/tax-categories')
      .json({
        name: '',
      })
      .send()

    response.assertStatus(422)
  })

  test('deletes a tax category', async ({ client, assert }) => {
    const taxCategory = await TaxCategory.create({
      name: 'To Delete',
    })

    const response = await client.delete(`/api/tax-categories/${taxCategory.id}`).send()

    response.assertStatus(204)
    assert.isNull(await TaxCategory.find(taxCategory.id))
  })
})

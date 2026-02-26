import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'
import Asset from '#models/asset'
import { randomUUID } from 'node:crypto'

test.group('Assets CRUD', (group) => {
  group.each.setup(() => testUtils.db().wrapInGlobalTransaction())

  test('creates an asset', async ({ client, assert }) => {
    const response = await client
      .post('/api/assets')
      .json({
        name: 'hero-banner',
        width: 1200,
        height: 630,
      })
      .send()

    response.assertStatus(201)
    response.assertBodyContains({
      name: 'hero-banner',
      width: 1200,
      height: 630,
    })

    const body = response.body() as { id: number }
    const savedAsset = await Asset.find(body.id)

    assert.isNotNull(savedAsset)
    assert.equal(savedAsset!.name, 'hero-banner')
    assert.equal(savedAsset!.width, 1200)
    assert.equal(savedAsset!.height, 630)
  })

  test('lists assets with q filter', async ({ client, assert }) => {
    const token = randomUUID()

    const matchingAsset = await Asset.create({
      name: `match-${token}`,
      width: 800,
      height: 600,
    })

    await Asset.create({
      name: `other-${token}`,
      width: 400,
      height: 300,
    })

    const response = await client
      .get('/api/assets')
      .qs({
        q: `match-${token}`,
      })
      .send()

    response.assertStatus(200)
    const body = response.body() as {
      data: Array<{ id: number; name: string }>
      meta: { total: number }
    }

    assert.isAtLeast(body.meta.total, 1)
    assert.isTrue(body.data.some((item) => item.id === matchingAsset.id))
    assert.isTrue(body.data.every((item) => item.name.includes(`match-${token}`)))
  })

  test('shows an asset by id', async ({ client }) => {
    const asset = await Asset.create({
      name: 'thumbnail',
      width: 300,
      height: 200,
    })

    const response = await client.get(`/api/assets/${asset.id}`).send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: asset.id,
      name: 'thumbnail',
      width: 300,
      height: 200,
    })
  })

  test('updates an asset', async ({ client, assert }) => {
    const asset = await Asset.create({
      name: 'original-asset',
      width: 100,
      height: 100,
    })

    const response = await client
      .put(`/api/assets/${asset.id}`)
      .json({
        name: 'updated-asset',
        width: 1920,
        height: 1080,
      })
      .send()

    response.assertStatus(200)
    response.assertBodyContains({
      id: asset.id,
      name: 'updated-asset',
      width: 1920,
      height: 1080,
    })

    await asset.refresh()
    assert.equal(asset.name, 'updated-asset')
    assert.equal(asset.width, 1920)
    assert.equal(asset.height, 1080)
  })

  test('rejects invalid asset payload', async ({ client }) => {
    const response = await client
      .post('/api/assets')
      .json({
        name: '',
        width: -10,
        height: 100,
      })
      .send()

    response.assertStatus(422)
  })

  test('deletes an asset', async ({ client, assert }) => {
    const asset = await Asset.create({
      name: 'delete-me',
      width: 500,
      height: 500,
    })

    const response = await client.delete(`/api/assets/${asset.id}`).send()

    response.assertStatus(204)
    assert.isNull(await Asset.find(asset.id))
  })
})

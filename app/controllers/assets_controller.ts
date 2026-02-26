import type { HttpContext } from '@adonisjs/core/http'
import Asset from '#models/asset'
import { createAssetValidator, updateAssetValidator } from '#validators/asset_validator'

export default class AssetsController {
  /**
   * GET /api/assets
   * Query support: ?page=1&perPage=20&q=logo
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    const q = request.input('q')

    const query = Asset.query().orderBy('id', 'desc')

    if (q) {
      query.whereILike('name', `%${q}%`)
    }

    return query.paginate(page, perPage)
  }

  /**
   * POST /api/assets
   */
  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createAssetValidator)
    const asset = await Asset.create(payload)
    return response.created(asset)
  }

  /**
   * GET /api/assets/:id
   */
  async show({ params }: HttpContext) {
    return Asset.findOrFail(params.id)
  }

  /**
   * PUT /api/assets/:id
   */
  async update({ params, request }: HttpContext) {
    const asset = await Asset.findOrFail(params.id)
    const payload = await request.validateUsing(updateAssetValidator)

    asset.merge(payload)
    await asset.save()

    return asset
  }

  /**
   * DELETE /api/assets/:id
   */
  async destroy({ params, response }: HttpContext) {
    const asset = await Asset.findOrFail(params.id)
    await asset.delete()
    return response.noContent()
  }
}

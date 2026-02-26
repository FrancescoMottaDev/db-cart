import type { HttpContext } from '@adonisjs/core/http'
import AssetService from '#services/asset_service'
import AssetTransformer from '#transformers/asset_transformer'
import { assetIdParamValidator } from '#validators/asset/asset_id_param_validator'
import { createAssetValidator } from '#validators/asset/create_asset_validator'
import { listAssetsValidator } from '#validators/asset/list_assets_validator'
import { updateAssetValidator } from '#validators/asset/update_asset_validator'

const assetService = new AssetService()

export default class AssetsController {
  /**
   * GET /api/assets
   * Query support: ?page=1&perPage=20&q=logo
   */
  async index({ request, logger }: HttpContext) {
    const filters = await listAssetsValidator.validate(request.qs())
    const assets = await assetService.list(filters)

    logger.debug(
      {
        page: filters.page ?? 1,
        perPage: filters.perPage ?? 20,
        q: filters.q,
        total: assets.total,
      },
      'assets.index'
    )

    return AssetTransformer.paginated(assets)
  }

  /**
   * POST /api/assets
   */
  async store({ request, response, logger }: HttpContext) {
    const payload = await request.validateUsing(createAssetValidator)
    const asset = await assetService.create(payload)

    logger.info({ assetId: asset.id }, 'assets.store')

    return response.created(AssetTransformer.item(asset))
  }

  /**
   * GET /api/assets/:id
   */
  async show({ params }: HttpContext) {
    const { id } = await assetIdParamValidator.validate(params)
    const asset = await assetService.findByIdOrFail(id)

    return AssetTransformer.item(asset)
  }

  /**
   * PUT /api/assets/:id
   */
  async update({ params, request, logger }: HttpContext) {
    const { id } = await assetIdParamValidator.validate(params)
    const payload = await request.validateUsing(updateAssetValidator)
    const asset = await assetService.update(id, payload)

    logger.info({ assetId: asset.id, changedFields: Object.keys(payload) }, 'assets.update')

    return AssetTransformer.item(asset)
  }

  /**
   * DELETE /api/assets/:id
   */
  async destroy({ params, response, logger }: HttpContext) {
    const { id } = await assetIdParamValidator.validate(params)
    await assetService.delete(id)

    logger.info({ assetId: id }, 'assets.destroy')

    return response.noContent()
  }
}

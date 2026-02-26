import type { HttpContext } from '@adonisjs/core/http'
import StockLocationService from '#services/stock_location_service'
import StockLocationTransformer from '#transformers/stock_location_transformer'
import { createStockLocationValidator } from '#validators/stock_location/create_stock_location_validator'
import { listStockLocationsValidator } from '#validators/stock_location/list_stock_locations_validator'
import { stockLocationIdParamValidator } from '#validators/stock_location/stock_location_id_param_validator'
import { updateStockLocationValidator } from '#validators/stock_location/update_stock_location_validator'

const stockLocationService = new StockLocationService()

export default class StockLocationsController {
  /**
   * GET /api/stock-locations
   * Query support: ?page=1&perPage=20&q=warehouse&shippingPriority=10
   */
  async index({ request, logger }: HttpContext) {
    const filters = await listStockLocationsValidator.validate(request.qs())
    const stockLocations = await stockLocationService.list(filters)

    logger.debug(
      {
        page: filters.page ?? 1,
        perPage: filters.perPage ?? 20,
        q: filters.q,
        shippingPriority: filters.shippingPriority,
        total: stockLocations.total,
      },
      'stock_locations.index'
    )

    return StockLocationTransformer.paginated(stockLocations)
  }

  /**
   * POST /api/stock-locations
   */
  async store({ request, response, logger }: HttpContext) {
    const payload = await request.validateUsing(createStockLocationValidator)
    const stockLocation = await stockLocationService.create(payload)

    logger.info({ stockLocationId: stockLocation.id }, 'stock_locations.store')

    return response.created(StockLocationTransformer.item(stockLocation))
  }

  /**
   * GET /api/stock-locations/:id
   */
  async show({ params }: HttpContext) {
    const { id } = await stockLocationIdParamValidator.validate(params)
    const stockLocation = await stockLocationService.findByIdOrFail(id)

    return StockLocationTransformer.item(stockLocation)
  }

  /**
   * PUT /api/stock-locations/:id
   */
  async update({ params, request, logger }: HttpContext) {
    const { id } = await stockLocationIdParamValidator.validate(params)
    const payload = await request.validateUsing(updateStockLocationValidator)
    const stockLocation = await stockLocationService.update(id, payload)

    logger.info(
      { stockLocationId: stockLocation.id, changedFields: Object.keys(payload) },
      'stock_locations.update'
    )

    return StockLocationTransformer.item(stockLocation)
  }

  /**
   * DELETE /api/stock-locations/:id
   */
  async destroy({ params, response, logger }: HttpContext) {
    const { id } = await stockLocationIdParamValidator.validate(params)
    await stockLocationService.delete(id)

    logger.info({ stockLocationId: id }, 'stock_locations.destroy')

    return response.noContent()
  }
}

import type { HttpContext } from '@adonisjs/core/http'
import ShippingCategoryService from '#services/shipping_category_service'
import ShippingCategoryTransformer from '#transformers/shipping_category_transformer'
import { createShippingCategoryValidator } from '#validators/shipping_category/create_shipping_category_validator'
import { listShippingCategoriesValidator } from '#validators/shipping_category/list_shipping_categories_validator'
import { shippingCategoryIdParamValidator } from '#validators/shipping_category/shipping_category_id_param_validator'
import { updateShippingCategoryValidator } from '#validators/shipping_category/update_shipping_category_validator'

const shippingCategoryService = new ShippingCategoryService()

export default class ShippingCategoriesController {
  /**
   * GET /api/shipping-categories
   * Query support: ?page=1&perPage=20&q=express
   */
  async index({ request, logger }: HttpContext) {
    const filters = await listShippingCategoriesValidator.validate(request.qs())
    const shippingCategories = await shippingCategoryService.list(filters)

    logger.debug(
      {
        page: filters.page ?? 1,
        perPage: filters.perPage ?? 20,
        q: filters.q,
        total: shippingCategories.total,
      },
      'shipping_categories.index'
    )

    return ShippingCategoryTransformer.paginated(shippingCategories)
  }

  /**
   * POST /api/shipping-categories
   */
  async store({ request, response, logger }: HttpContext) {
    const payload = await request.validateUsing(createShippingCategoryValidator)
    const shippingCategory = await shippingCategoryService.create(payload)

    logger.info({ shippingCategoryId: shippingCategory.id }, 'shipping_categories.store')

    return response.created(ShippingCategoryTransformer.item(shippingCategory))
  }

  /**
   * GET /api/shipping-categories/:id
   */
  async show({ params }: HttpContext) {
    const { id } = await shippingCategoryIdParamValidator.validate(params)
    const shippingCategory = await shippingCategoryService.findByIdOrFail(id)

    return ShippingCategoryTransformer.item(shippingCategory)
  }

  /**
   * PUT /api/shipping-categories/:id
   */
  async update({ params, request, logger }: HttpContext) {
    const { id } = await shippingCategoryIdParamValidator.validate(params)
    const payload = await request.validateUsing(updateShippingCategoryValidator)
    const shippingCategory = await shippingCategoryService.update(id, payload)

    logger.info(
      { shippingCategoryId: shippingCategory.id, changedFields: Object.keys(payload) },
      'shipping_categories.update'
    )

    return ShippingCategoryTransformer.item(shippingCategory)
  }

  /**
   * DELETE /api/shipping-categories/:id
   */
  async destroy({ params, response, logger }: HttpContext) {
    const { id } = await shippingCategoryIdParamValidator.validate(params)
    await shippingCategoryService.delete(id)

    logger.info({ shippingCategoryId: id }, 'shipping_categories.destroy')

    return response.noContent()
  }
}

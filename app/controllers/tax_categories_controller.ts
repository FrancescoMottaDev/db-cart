import type { HttpContext } from '@adonisjs/core/http'
import TaxCategoryService from '#services/tax_category_service'
import TaxCategoryTransformer from '#transformers/tax_category_transformer'
import { createTaxCategoryValidator } from '#validators/tax_category/create_tax_category_validator'
import { listTaxCategoriesValidator } from '#validators/tax_category/list_tax_categories_validator'
import { taxCategoryIdParamValidator } from '#validators/tax_category/tax_category_id_param_validator'
import { updateTaxCategoryValidator } from '#validators/tax_category/update_tax_category_validator'

const taxCategoryService = new TaxCategoryService()

export default class TaxCategoriesController {
  /**
   * GET /api/tax-categories
   * Query support: ?page=1&perPage=20&q=vat
   */
  async index({ request, logger }: HttpContext) {
    const filters = await listTaxCategoriesValidator.validate(request.qs())
    const taxCategories = await taxCategoryService.list(filters)

    logger.debug(
      {
        page: filters.page ?? 1,
        perPage: filters.perPage ?? 20,
        q: filters.q,
        total: taxCategories.total,
      },
      'tax_categories.index'
    )

    return TaxCategoryTransformer.paginated(taxCategories)
  }

  /**
   * POST /api/tax-categories
   */
  async store({ request, response, logger }: HttpContext) {
    const payload = await request.validateUsing(createTaxCategoryValidator)
    const taxCategory = await taxCategoryService.create(payload)

    logger.info({ taxCategoryId: taxCategory.id }, 'tax_categories.store')

    return response.created(TaxCategoryTransformer.item(taxCategory))
  }

  /**
   * GET /api/tax-categories/:id
   */
  async show({ params }: HttpContext) {
    const { id } = await taxCategoryIdParamValidator.validate(params)
    const taxCategory = await taxCategoryService.findByIdOrFail(id)

    return TaxCategoryTransformer.item(taxCategory)
  }

  /**
   * PUT /api/tax-categories/:id
   */
  async update({ params, request, logger }: HttpContext) {
    const { id } = await taxCategoryIdParamValidator.validate(params)
    const payload = await request.validateUsing(updateTaxCategoryValidator)
    const taxCategory = await taxCategoryService.update(id, payload)

    logger.info(
      { taxCategoryId: taxCategory.id, changedFields: Object.keys(payload) },
      'tax_categories.update'
    )

    return TaxCategoryTransformer.item(taxCategory)
  }

  /**
   * DELETE /api/tax-categories/:id
   */
  async destroy({ params, response, logger }: HttpContext) {
    const { id } = await taxCategoryIdParamValidator.validate(params)
    await taxCategoryService.delete(id)

    logger.info({ taxCategoryId: id }, 'tax_categories.destroy')

    return response.noContent()
  }
}

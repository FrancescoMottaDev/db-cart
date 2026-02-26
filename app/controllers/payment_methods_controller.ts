import type { HttpContext } from '@adonisjs/core/http'
import PaymentMethodService from '#services/payment_method_service'
import PaymentMethodTransformer from '#transformers/payment_method_transformer'
import { createPaymentMethodValidator } from '#validators/payment_method/create_payment_method_validator'
import { listPaymentMethodsValidator } from '#validators/payment_method/list_payment_methods_validator'
import { paymentMethodIdParamValidator } from '#validators/payment_method/payment_method_id_param_validator'
import { updatePaymentMethodValidator } from '#validators/payment_method/update_payment_method_validator'

const paymentMethodService = new PaymentMethodService()

export default class PaymentMethodsController {
  /**
   * GET /api/payment-methods
   * Query support: ?page=1&perPage=20&q=card
   */
  async index({ request, logger }: HttpContext) {
    const filters = await listPaymentMethodsValidator.validate(request.qs())
    const paymentMethods = await paymentMethodService.list(filters)

    logger.debug(
      {
        page: filters.page ?? 1,
        perPage: filters.perPage ?? 20,
        q: filters.q,
        total: paymentMethods.total,
      },
      'payment_methods.index'
    )

    return PaymentMethodTransformer.paginated(paymentMethods)
  }

  /**
   * POST /api/payment-methods
   */
  async store({ request, response, logger }: HttpContext) {
    const payload = await request.validateUsing(createPaymentMethodValidator)
    const paymentMethod = await paymentMethodService.create(payload)

    logger.info({ paymentMethodId: paymentMethod.id }, 'payment_methods.store')

    return response.created(PaymentMethodTransformer.item(paymentMethod))
  }

  /**
   * GET /api/payment-methods/:id
   */
  async show({ params }: HttpContext) {
    const { id } = await paymentMethodIdParamValidator.validate(params)
    const paymentMethod = await paymentMethodService.findByIdOrFail(id)

    return PaymentMethodTransformer.item(paymentMethod)
  }

  /**
   * PUT /api/payment-methods/:id
   */
  async update({ params, request, logger }: HttpContext) {
    const { id } = await paymentMethodIdParamValidator.validate(params)
    const payload = await request.validateUsing(updatePaymentMethodValidator)
    const paymentMethod = await paymentMethodService.update(id, payload)

    logger.info(
      { paymentMethodId: paymentMethod.id, changedFields: Object.keys(payload) },
      'payment_methods.update'
    )

    return PaymentMethodTransformer.item(paymentMethod)
  }

  /**
   * DELETE /api/payment-methods/:id
   */
  async destroy({ params, response, logger }: HttpContext) {
    const { id } = await paymentMethodIdParamValidator.validate(params)
    await paymentMethodService.delete(id)

    logger.info({ paymentMethodId: id }, 'payment_methods.destroy')

    return response.noContent()
  }
}

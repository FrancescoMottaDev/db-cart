import type PaymentMethod from '#models/payment_method'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class PaymentMethodTransformer {
  static item(paymentMethod: PaymentMethod) {
    return {
      id: paymentMethod.id,
      name: paymentMethod.name,
    }
  }

  static paginated(paginator: ModelPaginatorContract<PaymentMethod>) {
    return {
      meta: paginator.getMeta(),
      data: paginator.all().map((paymentMethod) => this.item(paymentMethod)),
    }
  }
}

import type ShippingCategory from '#models/shipping_category'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class ShippingCategoryTransformer {
  static item(shippingCategory: ShippingCategory) {
    return {
      id: shippingCategory.id,
      name: shippingCategory.name,
    }
  }

  static paginated(paginator: ModelPaginatorContract<ShippingCategory>) {
    return {
      meta: paginator.getMeta(),
      data: paginator.all().map((shippingCategory) => this.item(shippingCategory)),
    }
  }
}

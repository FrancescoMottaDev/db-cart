import type TaxCategory from '#models/tax_category'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class TaxCategoryTransformer {
  static item(taxCategory: TaxCategory) {
    return {
      id: taxCategory.id,
      name: taxCategory.name,
      createdAt: taxCategory.createdAt?.toISO() ?? null,
      updatedAt: taxCategory.updatedAt?.toISO() ?? null,
    }
  }

  static paginated(paginator: ModelPaginatorContract<TaxCategory>) {
    return {
      meta: paginator.getMeta(),
      data: paginator.all().map((taxCategory) => this.item(taxCategory)),
    }
  }
}

import type StockLocation from '#models/stock_location'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class StockLocationTransformer {
  static item(stockLocation: StockLocation) {
    return {
      id: stockLocation.id,
      name: stockLocation.name,
      shippingPriority: stockLocation.shippingPriority,
    }
  }

  static paginated(paginator: ModelPaginatorContract<StockLocation>) {
    return {
      meta: paginator.getMeta(),
      data: paginator.all().map((stockLocation) => this.item(stockLocation)),
    }
  }
}

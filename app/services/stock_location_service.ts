import StockLocation from '#models/stock_location'

type ListStockLocationsInput = {
  page?: number
  perPage?: number
  q?: string
  shippingPriority?: number
}

type CreateStockLocationInput = {
  name: string
  shippingPriority?: number | null
}

type UpdateStockLocationInput = Partial<CreateStockLocationInput>

export default class StockLocationService {
  async list(filters: ListStockLocationsInput) {
    const page = filters.page ?? 1
    const perPage = filters.perPage ?? 20

    const query = StockLocation.query().orderBy('id', 'desc')

    if (filters.q) {
      query.whereILike('name', `%${filters.q}%`)
    }

    if (filters.shippingPriority !== undefined) {
      query.where('shipping_priority', filters.shippingPriority)
    }

    return query.paginate(page, perPage)
  }

  async create(payload: CreateStockLocationInput) {
    return StockLocation.create({
      name: payload.name,
      shippingPriority: payload.shippingPriority ?? null,
    })
  }

  async findByIdOrFail(id: number) {
    return StockLocation.findOrFail(id)
  }

  async update(id: number, payload: UpdateStockLocationInput) {
    const stockLocation = await this.findByIdOrFail(id)

    stockLocation.merge(payload)
    await stockLocation.save()

    return stockLocation
  }

  async delete(id: number) {
    const stockLocation = await this.findByIdOrFail(id)
    await stockLocation.delete()
  }
}

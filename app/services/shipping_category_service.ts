import ShippingCategory from '#models/shipping_category'

type ListShippingCategoriesInput = {
  page?: number
  perPage?: number
  q?: string
}

type CreateShippingCategoryInput = {
  name: string
}

type UpdateShippingCategoryInput = Partial<CreateShippingCategoryInput>

export default class ShippingCategoryService {
  async list(filters: ListShippingCategoriesInput) {
    const page = filters.page ?? 1
    const perPage = filters.perPage ?? 20

    const query = ShippingCategory.query().orderBy('id', 'desc')

    if (filters.q) {
      query.whereILike('name', `%${filters.q}%`)
    }

    return query.paginate(page, perPage)
  }

  async create(payload: CreateShippingCategoryInput) {
    return ShippingCategory.create(payload)
  }

  async findByIdOrFail(id: number) {
    return ShippingCategory.findOrFail(id)
  }

  async update(id: number, payload: UpdateShippingCategoryInput) {
    const shippingCategory = await this.findByIdOrFail(id)

    shippingCategory.merge(payload)
    await shippingCategory.save()

    return shippingCategory
  }

  async delete(id: number) {
    const shippingCategory = await this.findByIdOrFail(id)
    await shippingCategory.delete()
  }
}

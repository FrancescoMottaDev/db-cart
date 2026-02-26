import TaxCategory from '#models/tax_category'

type ListTaxCategoriesInput = {
  page?: number
  perPage?: number
  q?: string
}

type CreateTaxCategoryInput = {
  name: string
}

type UpdateTaxCategoryInput = Partial<CreateTaxCategoryInput>

export default class TaxCategoryService {
  async list(filters: ListTaxCategoriesInput) {
    const page = filters.page ?? 1
    const perPage = filters.perPage ?? 20

    const query = TaxCategory.query().orderBy('id', 'desc')

    if (filters.q) {
      query.whereILike('name', `%${filters.q}%`)
    }

    return query.paginate(page, perPage)
  }

  async create(payload: CreateTaxCategoryInput) {
    return TaxCategory.create(payload)
  }

  async findByIdOrFail(id: number) {
    return TaxCategory.findOrFail(id)
  }

  async update(id: number, payload: UpdateTaxCategoryInput) {
    const taxCategory = await this.findByIdOrFail(id)

    taxCategory.merge(payload)
    await taxCategory.save()

    return taxCategory
  }

  async delete(id: number) {
    const taxCategory = await this.findByIdOrFail(id)
    await taxCategory.delete()
  }
}

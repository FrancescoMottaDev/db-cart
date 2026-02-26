import PaymentMethod from '#models/payment_method'

type ListPaymentMethodsInput = {
  page?: number
  perPage?: number
  q?: string
}

type CreatePaymentMethodInput = {
  name: string
}

type UpdatePaymentMethodInput = Partial<CreatePaymentMethodInput>

export default class PaymentMethodService {
  async list(filters: ListPaymentMethodsInput) {
    const page = filters.page ?? 1
    const perPage = filters.perPage ?? 20

    const query = PaymentMethod.query().orderBy('id', 'desc')

    if (filters.q) {
      query.whereILike('name', `%${filters.q}%`)
    }

    return query.paginate(page, perPage)
  }

  async create(payload: CreatePaymentMethodInput) {
    return PaymentMethod.create(payload)
  }

  async findByIdOrFail(id: number) {
    return PaymentMethod.findOrFail(id)
  }

  async update(id: number, payload: UpdatePaymentMethodInput) {
    const paymentMethod = await this.findByIdOrFail(id)

    paymentMethod.merge(payload)
    await paymentMethod.save()

    return paymentMethod
  }

  async delete(id: number) {
    const paymentMethod = await this.findByIdOrFail(id)
    await paymentMethod.delete()
  }
}

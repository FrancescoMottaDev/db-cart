import vine from '@vinejs/vine'

export const listStockLocationsValidator = vine.create(
  vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(1).max(100).optional(),
    q: vine.string().trim().minLength(1).maxLength(255).optional(),
    shippingPriority: vine.number().min(0).optional(),
  })
)

import vine from '@vinejs/vine'

export const updateStockLocationValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    shippingPriority: vine.number().min(0).optional().nullable(),
  })
)

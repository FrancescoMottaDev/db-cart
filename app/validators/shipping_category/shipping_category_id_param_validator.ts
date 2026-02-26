import vine from '@vinejs/vine'

export const shippingCategoryIdParamValidator = vine.create(
  vine.object({
    id: vine.number().min(1),
  })
)

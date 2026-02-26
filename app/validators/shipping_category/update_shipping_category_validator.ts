import vine from '@vinejs/vine'

export const updateShippingCategoryValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
  })
)

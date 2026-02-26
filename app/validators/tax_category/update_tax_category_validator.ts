import vine from '@vinejs/vine'

export const updateTaxCategoryValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
  })
)

import vine from '@vinejs/vine'

export const createTaxCategoryValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
  })
)

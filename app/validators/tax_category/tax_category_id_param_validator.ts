import vine from '@vinejs/vine'

export const taxCategoryIdParamValidator = vine.create(
  vine.object({
    id: vine.number().min(1),
  })
)

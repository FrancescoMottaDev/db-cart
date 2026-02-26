import vine from '@vinejs/vine'

export const listCollectionsValidator = vine.create(
  vine.object({
    page: vine.number().min(1).optional(),
    perPage: vine.number().min(1).max(100).optional(),
    q: vine.string().trim().minLength(1).maxLength(255).optional(),
    parentCollectionId: vine.number().min(1).optional(),
  })
)

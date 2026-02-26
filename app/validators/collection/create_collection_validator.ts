import vine from '@vinejs/vine'

export const createCollectionValidator = vine.create(
  vine.object({
    code: vine.string().trim().minLength(1).maxLength(255),
    name: vine.string().trim().minLength(1).maxLength(255),
    parentCollectionId: vine.number().min(1).optional().nullable(),
  })
)

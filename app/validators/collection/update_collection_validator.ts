import vine from '@vinejs/vine'

export const updateCollectionValidator = vine.create(
  vine.object({
    code: vine.string().trim().minLength(1).maxLength(255).optional(),
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    parentCollectionId: vine.number().min(1).optional().nullable(),
  })
)

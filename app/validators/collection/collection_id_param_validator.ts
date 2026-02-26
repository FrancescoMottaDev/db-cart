import vine from '@vinejs/vine'

export const collectionIdParamValidator = vine.create(
  vine.object({
    id: vine.number().min(1),
  })
)

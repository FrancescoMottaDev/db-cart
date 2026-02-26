import vine from '@vinejs/vine'

export const assetIdParamValidator = vine.create(
  vine.object({
    id: vine.number().min(1),
  })
)

import vine from '@vinejs/vine'

export const updateAssetValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    width: vine.number().min(0).optional(),
    height: vine.number().min(0).optional(),
  })
)

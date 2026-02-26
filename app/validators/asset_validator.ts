import vine from '@vinejs/vine'

export const createAssetValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    width: vine.number().min(0),
    height: vine.number().min(0),
  })
)

export const updateAssetValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255).optional(),
    width: vine.number().min(0).optional(),
    height: vine.number().min(0).optional(),
  })
)

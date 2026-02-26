import vine from '@vinejs/vine'

export const createAssetValidator = vine.create(
  vine.object({
    name: vine.string().trim().minLength(1).maxLength(255),
    width: vine.number().min(0),
    height: vine.number().min(0),
  })
)

import vine from '@vinejs/vine'

export const stockLocationIdParamValidator = vine.create(
  vine.object({
    id: vine.number().min(1),
  })
)

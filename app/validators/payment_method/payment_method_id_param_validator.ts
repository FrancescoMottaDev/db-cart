import vine from '@vinejs/vine'

export const paymentMethodIdParamValidator = vine.create(
  vine.object({
    id: vine.number().min(1),
  })
)

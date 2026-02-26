import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class GiftCard extends BaseModel {
  public static table = 'gift_card'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare channelId: number | null

  @column()
  declare name: string | null

  @column()
  declare amount: number | null

  @column()
  declare fromName: string | null

  @column()
  declare giftMessage: string | null

  @column()
  declare recipientName: string | null

  @column()
  declare recipientEmail: string | null
}

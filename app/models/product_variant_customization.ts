import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ProductVariantCustomization extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productVariantId: number

  @column()
  declare orderLineItem: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*************  RELATIONS  *************/
}

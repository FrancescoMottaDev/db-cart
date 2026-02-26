import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import ProductOption from './product_option.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ProductOptionValue extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare value: string

  @column()
  declare optionId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*************  RELATIONS  *************/

  @belongsTo(() => ProductOption, {
    foreignKey: 'product_id',
  })
  declare product: BelongsTo<typeof ProductOption>
}

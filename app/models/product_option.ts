import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import ProductOptionValue from './product_option_value.js'

export default class ProductOption extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*************  RELATIONS  *************/

  @belongsTo(() => Product, {
    foreignKey: 'product_id',
  })
  declare product: BelongsTo<typeof Product>

  @hasMany(() => ProductOptionValue, {
    foreignKey: 'option_id',
  })
  declare productOptionValues: HasMany<typeof ProductOptionValue>
}

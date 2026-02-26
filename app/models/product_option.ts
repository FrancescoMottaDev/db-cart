import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'
import ProductOptionValue from '#models/product_option_value'

export default class ProductOption extends BaseModel {
  public static table = 'product_option'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Product, {
    foreignKey: 'productId',
  })
  declare product: BelongsTo<typeof Product>

  @hasMany(() => ProductOptionValue, {
    foreignKey: 'optionId',
  })
  declare productOptionValues: HasMany<typeof ProductOptionValue>
}

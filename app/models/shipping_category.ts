import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import ProductVariant from '#models/product_variant'

export default class ShippingCategory extends BaseModel {
  public static table = 'shipping_category'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  /*************  RELATIONS  *************/

  @hasMany(() => ProductVariant, {
    foreignKey: 'shippingCategoryId',
  })
  declare productVariants: HasMany<typeof ProductVariant>
}

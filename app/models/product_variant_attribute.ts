import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import AttributeValue from '#models/attribute_value'
import ProductVariant from '#models/product_variant'

export default class ProductVariantAttribute extends BaseModel {
  public static table = 'product_variant_attributes'

  @column({ isPrimary: true })
  declare productVariantId: number

  @column({ isPrimary: true })
  declare attributeValueId: number

  /*************  RELATIONS  *************/

  @belongsTo(() => AttributeValue, {
    foreignKey: 'attributeValueId',
  })
  declare attributeValue: BelongsTo<typeof AttributeValue>

  @belongsTo(() => ProductVariant, {
    foreignKey: 'productVariantId',
  })
  declare productVariant: BelongsTo<typeof ProductVariant>
}

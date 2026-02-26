import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Attribute from '#models/attribute'
import Product from '#models/product'
import ProductAttribute from '#models/product_attribute'
import ProductVariant from '#models/product_variant'
import ProductVariantAttribute from '#models/product_variant_attribute'

export default class AttributeValue extends BaseModel {
  public static table = 'attribute_value'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare attributeId: number | null

  @column()
  declare name: string | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Attribute, {
    foreignKey: 'attributeId',
  })
  declare attribute: BelongsTo<typeof Attribute>

  @manyToMany(() => Product, {
    pivotTable: 'product_attributes',
    pivotForeignKey: 'attribute_value_id',
    pivotRelatedForeignKey: 'product_id',
  })
  declare products: ManyToMany<typeof Product>

  @manyToMany(() => ProductVariant, {
    pivotTable: 'product_variant_attributes',
    pivotForeignKey: 'attribute_value_id',
    pivotRelatedForeignKey: 'product_variant_id',
  })
  declare productVariants: ManyToMany<typeof ProductVariant>

  @hasMany(() => ProductAttribute, {
    foreignKey: 'attributeValueId',
  })
  declare productAttributes: HasMany<typeof ProductAttribute>

  @hasMany(() => ProductVariantAttribute, {
    foreignKey: 'attributeValueId',
  })
  declare productVariantAttributes: HasMany<typeof ProductVariantAttribute>
}

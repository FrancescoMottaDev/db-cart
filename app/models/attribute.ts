import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import AttributeValue from '#models/attribute_value'

export default class Attribute extends BaseModel {
  public static table = 'attribute'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  /*************  RELATIONS  *************/

  @hasMany(() => AttributeValue, {
    foreignKey: 'attributeId',
  })
  declare attributeValues: HasMany<typeof AttributeValue>
}

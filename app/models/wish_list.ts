import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Customer from '#models/customer'
import WishListProduct from '#models/wish_list_product'

export default class WishList extends BaseModel {
  public static table = 'wish_list'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare channelId: number | null

  @column()
  declare customerId: number | null

  @column()
  declare name: string | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Customer, {
    foreignKey: 'customerId',
  })
  declare customer: BelongsTo<typeof Customer>

  @hasMany(() => WishListProduct, {
    foreignKey: 'wishListId',
  })
  declare wishListProducts: HasMany<typeof WishListProduct>
}

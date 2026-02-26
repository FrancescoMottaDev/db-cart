import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import WishList from '#models/wish_list'

export default class WishListProduct extends BaseModel {
  public static table = 'wish_list_products'

  @column()
  declare wishListId: number | null

  @column()
  declare productVariantId: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => WishList, {
    foreignKey: 'wishListId',
  })
  declare wishList: BelongsTo<typeof WishList>
}

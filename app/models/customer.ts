import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import CustomerAddress from '#models/customer_address'
import CustomerGroup from '#models/customer_group'
import Order from '#models/order'
import User from '#models/user'
import WishList from '#models/wish_list'

export default class Customer extends BaseModel {
  public static table = 'customer'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string | null

  @column()
  declare userId: number | null

  @column()
  declare customerGroupId: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => CustomerGroup, {
    foreignKey: 'customerGroupId',
  })
  declare customerGroup: BelongsTo<typeof CustomerGroup>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => CustomerAddress, {
    foreignKey: 'customerId',
  })
  declare customerAddresses: HasMany<typeof CustomerAddress>

  @hasMany(() => Order, {
    foreignKey: 'customerId',
  })
  declare orders: HasMany<typeof Order>

  @hasMany(() => WishList, {
    foreignKey: 'customerId',
  })
  declare wishLists: HasMany<typeof WishList>
}

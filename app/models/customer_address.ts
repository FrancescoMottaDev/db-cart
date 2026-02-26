import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Customer from '#models/customer'
import Order from '#models/order'
import Region from '#models/region'

export default class CustomerAddress extends BaseModel {
  public static table = 'customer_address'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number | null

  @column()
  declare isDefaultShipping: boolean | null

  @column()
  declare isDefaultBilling: boolean | null

  @column()
  declare fullName: string | null

  @column()
  declare company: string | null

  @column({ columnName: 'street_line_1' })
  declare streetLine1: string | null

  @column({ columnName: 'street_line_2' })
  declare streetLine2: string | null

  @column()
  declare city: string | null

  @column()
  declare province: string | null

  @column()
  declare zipCode: string | null

  @column()
  declare phoneNumber: string | null

  @column()
  declare countryId: number | null

  /*************  RELATIONS  *************/

  @belongsTo(() => Region, {
    foreignKey: 'countryId',
  })
  declare country: BelongsTo<typeof Region>

  @belongsTo(() => Customer, {
    foreignKey: 'customerId',
  })
  declare customer: BelongsTo<typeof Customer>

  @hasMany(() => Order, {
    foreignKey: 'billingAddressId',
  })
  declare billingAddressOrders: HasMany<typeof Order>

  @hasMany(() => Order, {
    foreignKey: 'shippingAddressId',
  })
  declare shippingAddressOrders: HasMany<typeof Order>
}

import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Customer from './customer.js'
import Region from './region.js'

export default class CustomerAddress extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare isDefaultShipping: boolean

  @column()
  declare isDefaultBilling: boolean

  @column()
  declare fullName: string

  @column()
  declare company?: string

  @column()
  declare streetLine1: string

  @column()
  declare streetLine2?: string

  @column()
  declare city: string

  @column()
  declare province?: string

  @column()
  declare zipCode: string

  @column()
  declare phoneNumber?: string

  @column()
  declare countryId: number

  /*************  RELATIONS  *************/

  @belongsTo(() => Customer, {
    foreignKey: 'customer_id',
  })
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Region, {
    foreignKey: 'country_id',
  })
  declare country: BelongsTo<typeof Region>
}

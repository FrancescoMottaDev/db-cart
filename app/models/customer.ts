import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import CustomerGroup from './customer_group.js'
import CustomerAddress from './customer_address.js'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*************  RELATIONS  *************/

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => CustomerGroup)
  declare customerGroup: BelongsTo<typeof CustomerGroup>

  @hasMany(() => CustomerAddress, {
    foreignKey: 'customer_id',
  })
  declare addresses: HasMany<typeof CustomerAddress>
}

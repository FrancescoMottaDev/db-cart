import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Customer from '#models/customer'
import Role from '#models/role'
import UserRoles from '#models/user_roles'

export default class User extends BaseModel {
  public static table = 'user'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare email: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime | null

  /*************  RELATIONS  *************/

  @manyToMany(() => Role, {
    pivotTable: 'user_roles',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'role_id',
  })
  declare roles: ManyToMany<typeof Role>

  @hasMany(() => Customer, {
    foreignKey: 'userId',
  })
  declare customers: HasMany<typeof Customer>

  @hasMany(() => UserRoles, {
    foreignKey: 'userId',
  })
  declare userRoles: HasMany<typeof UserRoles>
}

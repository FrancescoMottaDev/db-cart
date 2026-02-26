import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Permission from './permission.js'

export default class Role extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*************  RELATIONS  *************/

  @manyToMany(() => User, {
    localKey: 'id',
    relatedKey: 'id',
    pivotTable: 'user_roles',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare users: ManyToMany<typeof User>

  @manyToMany(() => Permission, {
    localKey: 'id',
    relatedKey: 'id',
    pivotTable: 'role_permissions',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'permission_id',
  })
  declare permissions: ManyToMany<typeof Permission>
}

import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Permission from '#models/permission'
import RolePermissions from '#models/role_permissions'
import User from '#models/user'
import UserRoles from '#models/user_roles'

export default class Role extends BaseModel {
  public static table = 'role'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  /*************  RELATIONS  *************/

  @manyToMany(() => Permission, {
    pivotTable: 'role_permissions',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'permission_id',
  })
  declare permissions: ManyToMany<typeof Permission>

  @manyToMany(() => User, {
    pivotTable: 'user_roles',
    pivotForeignKey: 'role_id',
    pivotRelatedForeignKey: 'user_id',
  })
  declare users: ManyToMany<typeof User>

  @hasMany(() => RolePermissions, {
    foreignKey: 'roleId',
  })
  declare rolePermissions: HasMany<typeof RolePermissions>

  @hasMany(() => UserRoles, {
    foreignKey: 'roleId',
  })
  declare userRoles: HasMany<typeof UserRoles>
}

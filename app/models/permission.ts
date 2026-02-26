import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import RolePermissions from '#models/role_permissions'

export default class Permission extends BaseModel {
  public static table = 'permission'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  /*************  RELATIONS  *************/

  @manyToMany(() => Role, {
    pivotTable: 'role_permissions',
    pivotForeignKey: 'permission_id',
    pivotRelatedForeignKey: 'role_id',
  })
  declare roles: ManyToMany<typeof Role>

  @hasMany(() => RolePermissions, {
    foreignKey: 'permissionId',
  })
  declare rolePermissions: HasMany<typeof RolePermissions>
}

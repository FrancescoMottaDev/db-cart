import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Permission from '#models/permission'
import Role from '#models/role'

export default class RolePermissions extends BaseModel {
  public static table = 'role_permissions'

  @column({ isPrimary: true })
  declare roleId: number

  @column({ isPrimary: true })
  declare permissionId: number

  /*************  RELATIONS  *************/

  @belongsTo(() => Permission, {
    foreignKey: 'permissionId',
  })
  declare permission: BelongsTo<typeof Permission>

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  declare role: BelongsTo<typeof Role>
}

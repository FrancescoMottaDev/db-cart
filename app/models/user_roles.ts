import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import User from '#models/user'

export default class UserRoles extends BaseModel {
  public static table = 'user_roles'

  @column({ isPrimary: true })
  declare userId: number

  @column({ isPrimary: true })
  declare roleId: number

  /*************  RELATIONS  *************/

  @belongsTo(() => Role, {
    foreignKey: 'roleId',
  })
  declare role: BelongsTo<typeof Role>

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  declare user: BelongsTo<typeof User>
}

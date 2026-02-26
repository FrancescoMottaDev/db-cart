import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RolePermissions extends BaseModel {
  @column({ isPrimary: true })
  declare roleId: number

  @column({ isPrimary: true })
  declare permissionId: number
}

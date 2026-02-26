import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class UserRoles extends BaseModel {
  @column({ isPrimary: true })
  declare userId: number

  @column({ isPrimary: true })
  declare roleId: number
}

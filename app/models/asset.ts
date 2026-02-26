import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Asset extends BaseModel {
  static table = 'asset'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare width: number

  @column()
  declare height: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /*************  RELATIONS  *************/
}

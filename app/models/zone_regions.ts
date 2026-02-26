import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ZoneRegions extends BaseModel {
  @column({ isPrimary: true })
  declare zoneId: number

  @column({ isPrimary: true })
  declare regionId: number

  /*************  RELATIONS  *************/
}

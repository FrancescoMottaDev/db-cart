import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Region from '#models/region'
import Zone from '#models/zone'

export default class ZoneRegions extends BaseModel {
  public static table = 'zone_regions'

  @column({ isPrimary: true })
  declare zoneId: number

  @column({ isPrimary: true })
  declare regionId: number

  /*************  RELATIONS  *************/

  @belongsTo(() => Region, {
    foreignKey: 'regionId',
  })
  declare region: BelongsTo<typeof Region>

  @belongsTo(() => Zone, {
    foreignKey: 'zoneId',
  })
  declare zone: BelongsTo<typeof Zone>
}

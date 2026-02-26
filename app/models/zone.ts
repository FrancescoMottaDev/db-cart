import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Region from '#models/region'
import ZoneRegions from '#models/zone_regions'

export default class Zone extends BaseModel {
  public static table = 'zone'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  /*************  RELATIONS  *************/

  @manyToMany(() => Region, {
    pivotTable: 'zone_regions',
    pivotForeignKey: 'zone_id',
    pivotRelatedForeignKey: 'region_id',
  })
  declare regions: ManyToMany<typeof Region>

  @hasMany(() => ZoneRegions, {
    foreignKey: 'zoneId',
  })
  declare zoneRegions: HasMany<typeof ZoneRegions>
}

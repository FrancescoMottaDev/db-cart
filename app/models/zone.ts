import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Region from './region.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Zone extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  /*************  RELATIONS  *************/

  @manyToMany(() => Region, {
    localKey: 'id',
    relatedKey: 'id',
    pivotTable: 'zone_regions',
    pivotForeignKey: 'zone_id',
    pivotRelatedForeignKey: 'region_id',
  })
  declare roles: ManyToMany<typeof Region>
}

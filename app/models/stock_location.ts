import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Shipment from '#models/shipment'
import StockLevel from '#models/stock_level'

export default class StockLocation extends BaseModel {
  public static table = 'stock_location'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string | null

  @column()
  declare shippingPriority: number | null

  /*************  RELATIONS  *************/

  @hasMany(() => Shipment, {
    foreignKey: 'fromStockLocationId',
  })
  declare shipments: HasMany<typeof Shipment>

  @hasMany(() => StockLevel, {
    foreignKey: 'stockLocationId',
  })
  declare stockLevels: HasMany<typeof StockLevel>
}

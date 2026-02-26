import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Customer from '#models/customer'
import CustomerAddress from '#models/customer_address'
import OrderLineItem from '#models/order_line_item'
import Payment from '#models/payment'
import PaymentMethod from '#models/payment_method'
import Refund from '#models/refund'
import Return from '#models/return'
import Shipment from '#models/shipment'
import ShippingMethod from '#models/shipping_method'

export default class Order extends BaseModel {
  public static table = 'order'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare channelId: number | null

  @column()
  declare customerId: number | null

  @column()
  declare billingAddressId: number | null

  @column()
  declare shippingAddressId: number | null

  @column()
  declare paymentMethodId: number | null

  @column()
  declare shippingMethodId: number | null

  @column()
  declare status: string | null

  @column()
  declare isGuest: boolean | null

  /*************  RELATIONS  *************/

  @belongsTo(() => CustomerAddress, {
    foreignKey: 'billingAddressId',
  })
  declare billingAddress: BelongsTo<typeof CustomerAddress>

  @belongsTo(() => Customer, {
    foreignKey: 'customerId',
  })
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => PaymentMethod, {
    foreignKey: 'paymentMethodId',
  })
  declare paymentMethod: BelongsTo<typeof PaymentMethod>

  @belongsTo(() => CustomerAddress, {
    foreignKey: 'shippingAddressId',
  })
  declare shippingAddress: BelongsTo<typeof CustomerAddress>

  @belongsTo(() => ShippingMethod, {
    foreignKey: 'shippingMethodId',
  })
  declare shippingMethod: BelongsTo<typeof ShippingMethod>

  @hasMany(() => OrderLineItem, {
    foreignKey: 'orderId',
  })
  declare orderLineItems: HasMany<typeof OrderLineItem>

  @hasMany(() => Payment, {
    foreignKey: 'orderId',
  })
  declare payments: HasMany<typeof Payment>

  @hasMany(() => Refund, {
    foreignKey: 'orderId',
  })
  declare refunds: HasMany<typeof Refund>

  @hasMany(() => Return, {
    foreignKey: 'orderId',
  })
  declare returns: HasMany<typeof Return>

  @hasMany(() => Shipment, {
    foreignKey: 'orderId',
  })
  declare shipments: HasMany<typeof Shipment>
}

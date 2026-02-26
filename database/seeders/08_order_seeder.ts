import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class OrdersSeeder extends BaseSeeder {
  public async run() {
    await db.transaction(async (trx) => {
      /**
       * RESET (figli prima)
       */
      await trx.from('order_line_item').delete()
      await trx.from('order').delete()

      /**
       * ORDER
       */
      await trx.table('order').insert([
        {
          id: 1,
          channel_id: 1,
          customer_id: 2,
          billing_address_id: 2,
          shipping_address_id: 2,
          payment_method_id: null,
          shipping_method_id: null,
          status: 'cart',
          is_guest: true,
        },
        {
          id: 2,
          channel_id: 1,
          customer_id: 1,
          billing_address_id: 1,
          shipping_address_id: 1,
          payment_method_id: 1,
          shipping_method_id: 1,
          status: 'placed',
          is_guest: false,
        },
        {
          id: 3,
          channel_id: 1,
          customer_id: 3,
          billing_address_id: 3,
          shipping_address_id: 3,
          payment_method_id: 1,
          shipping_method_id: 2,
          status: 'paid',
          is_guest: true,
        },
        {
          id: 4,
          channel_id: 1,
          customer_id: 4,
          billing_address_id: 4,
          shipping_address_id: 4,
          payment_method_id: 3,
          shipping_method_id: 1,
          status: 'fulfilled',
          is_guest: true,
        },
      ])

      /**
       * ORDER_LINE_ITEM
       */
      await trx.table('order_line_item').insert([
        { id: 1, order_id: 1, product_variant_id: 3, quantity: 1 },
        { id: 2, order_id: 1, product_variant_id: 1, quantity: 2 },

        { id: 3, order_id: 2, product_variant_id: 14, quantity: 1 },
        { id: 4, order_id: 2, product_variant_id: 9, quantity: 1 },

        { id: 5, order_id: 3, product_variant_id: 19, quantity: 1 },
        { id: 6, order_id: 3, product_variant_id: 16, quantity: 1 },
        { id: 7, order_id: 3, product_variant_id: 23, quantity: 2 },

        { id: 8, order_id: 4, product_variant_id: 20, quantity: 2 },
        { id: 9, order_id: 4, product_variant_id: 24, quantity: 5 },
        { id: 10, order_id: 4, product_variant_id: 26, quantity: 2 },
      ])
    })
  }
}

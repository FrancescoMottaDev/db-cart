import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class FulfillmentPaymentsSeeder extends BaseSeeder {
  public async run() {
    await db.transaction(async (trx) => {
      /**
       * RESET (ordine FK: pivot/figli -> padri)
       */
      await trx.from('shipped_items').delete()
      await trx.from('shipment').delete()

      await trx.from('refund').delete()
      await trx.from('return_line_items').delete()
      await trx.from('return').delete()

      await trx.from('payment').delete()
      await trx.from('stock_reservation').delete()

      await trx.from('gift_card').delete()

      /**
       * STOCK_RESERVATION
       */
      await trx.table('stock_reservation').insert([
        {
          id: 1,
          status: 'cart',
          order_line_item_id: 1,
          product_variant_id: 3,
          quantity: 1,
          expires_at: '2025-12-23 14:00:00',
        },
        {
          id: 2,
          status: 'cart',
          order_line_item_id: 2,
          product_variant_id: 1,
          quantity: 2,
          expires_at: '2025-12-23 14:00:00',
        },
      ])

      /**
       * PAYMENT (payment_metadata json)
       */
      await trx.table('payment').insert([
        {
          id: 1,
          order_id: 3,
          payment_method_id: 1,
          status: 'captured',
          payment_metadata: {
            provider: 'stripe',
            last4: '4242',
            auth_code: 'AUTH-7K3Q',
          },
        },
        {
          id: 2,
          order_id: 4,
          payment_method_id: 3,
          status: 'settled',
          payment_metadata: {
            reference: 'BT-2025-12-22-00031',
            bank: 'ACME Bank',
          },
        },
      ])

      /**
       * SHIPMENT
       */
      await trx.table('shipment').insert([{ id: 1, order_id: 4, from_stock_location: 1 }])

      /**
       * SHIPPED_ITEMS (pivot)
       */
      await trx.table('shipped_items').insert([
        { shipment_id: 1, order_line_item_id: 8 },
        { shipment_id: 1, order_line_item_id: 9 },
        { shipment_id: 1, order_line_item_id: 10 },
      ])

      /**
       * RETURN
       */
      await trx.table('return').insert([{ id: 1, order_id: 3 }])

      /**
       * RETURN_LINE_ITEMS (pivot)
       */
      await trx.table('return_line_items').insert([{ return_id: 1, order_line_item_id: 7 }])

      /**
       * REFUND
       */
      await trx
        .table('refund')
        .insert([{ id: 1, order_id: 3, return_id: 1, payment_id: 1, amount: 2980 }])

      /**
       * GIFT_CARD
       */
      await trx.table('gift_card').insert([
        {
          id: 1,
          channel_id: 1,
          name: 'dbCart Gift Card - Happy shipping!',
          amount: 5000,
          from_name: 'Jamie Rivera',
          gift_message: 'Use this for your next order.',
          recipient_name: 'Giulia Rossi',
          recipient_email: 'giulia.rossi@example.com',
        },
        {
          id: 2,
          channel_id: 1,
          name: 'dbCart Gift Card - Thanks!',
          amount: 2500,
          from_name: 'Acme Corp',
          gift_message: 'For your support of open source.',
          recipient_name: 'Nicola Bianchi',
          recipient_email: 'nicola.bianchi@example.com',
        },
      ])
    })
  }
}

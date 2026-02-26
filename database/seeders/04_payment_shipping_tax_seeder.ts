import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class PaymentShippingTaxSeeder extends BaseSeeder {
  public async run() {
    await db.transaction(async (trx) => {
      /**
       * RESET
       */
      await trx.from('payment_method').delete()
      await trx.from('shipping_method').delete()
      await trx.from('tax_category').delete()
      await trx.from('shipping_category').delete()

      /**
       * PAYMENT_METHOD
       */
      await trx.table('payment_method').insert([
        { id: 1, name: 'Credit Card' },
        { id: 2, name: 'PayPal' },
        { id: 3, name: 'Bank Transfer' },
        { id: 4, name: 'Gift Card' },
      ])

      /**
       * SHIPPING_METHOD
       */
      await trx.table('shipping_method').insert([
        { id: 1, name: 'Standard Shipping' },
        { id: 2, name: 'Express Shipping' },
        { id: 3, name: 'Local Pickup' },
      ])

      /**
       * TAX_CATEGORY
       */
      await trx.table('tax_category').insert([
        { id: 1, name: 'Standard VAT' },
        { id: 2, name: 'No Tax (Gift Card)' },
      ])

      /**
       * SHIPPING_CATEGORY
       */
      await trx.table('shipping_category').insert([
        { id: 1, name: 'Standard Parcel' },
        { id: 2, name: 'Letter Mail' },
        { id: 3, name: 'No Shipping (Digital)' },
      ])
    })
  }
}

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class WishlistsAndBundlesSeeder extends BaseSeeder {
  public async run() {
    await db.transaction(async (trx) => {
      /**
       * RESET
       */
      await trx.from('wish_list_products').delete()
      await trx.from('wish_list').delete()

      await trx.from('bundle_products').delete()
      await trx.from('bundle').delete()

      /**
       * WISH_LIST
       */
      await trx.table('wish_list').insert([
        { id: 1, channel_id: 1, customer_id: 1, name: 'Conference picks' },
        { id: 2, channel_id: 1, customer_id: 2, name: 'Gift ideas' },
      ])

      /**
       * WISH_LIST_PRODUCTS
       */
      await trx.table('wish_list_products').insert([
        { wish_list_id: 1, product_variant_id: 3 },
        { wish_list_id: 1, product_variant_id: 16 },
        { wish_list_id: 2, product_variant_id: 24 },
        { wish_list_id: 2, product_variant_id: 1 },
      ])

      /**
       * BUNDLE
       */
      await trx.table('bundle').insert([
        { id: 1, name: 'dbCart Starter Pack', price: 3990 },
        { id: 2, name: 'Office Kit', price: 2490 },
      ])

      /**
       * BUNDLE_PRODUCTS
       */
      await trx.table('bundle_products').insert([
        { bundle_id: 1, product_variant_id: 3 },
        { bundle_id: 1, product_variant_id: 1 },
        { bundle_id: 1, product_variant_id: 24 },
        { bundle_id: 2, product_variant_id: 20 },
        { bundle_id: 2, product_variant_id: 22 },
        { bundle_id: 2, product_variant_id: 21 },
      ])
    })
  }
}

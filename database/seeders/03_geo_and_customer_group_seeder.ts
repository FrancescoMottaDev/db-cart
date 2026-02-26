import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class GeoAndCustomerGroupsSeeder extends BaseSeeder {
  public async run() {
    await db.transaction(async (trx) => {
      /**
       * RESET
       */
      await trx.from('zone_regions').delete()
      await trx.from('zone').delete()
      await trx.from('region').delete()
      await trx.from('customer_group').delete()

      /**
       * CUSTOMER_GROUP
       */
      await trx.table('customer_group').insert([{ id: 1 }, { id: 2 }])

      /**
       * REGION
       */
      await trx.table('region').insert([
        { id: 1, code: 'IT', name: 'Italy', parent: null, type: 'country' },
        { id: 2, code: 'US', name: 'United States', parent: null, type: 'country' },
        { id: 3, code: 'DE', name: 'Germany', parent: null, type: 'country' },
        { id: 4, code: 'GB', name: 'United Kingdom', parent: null, type: 'country' },

        { id: 10, code: 'IT-TO', name: 'Torino', parent: 1, type: 'province' },
        { id: 11, code: 'IT-MI', name: 'Milano', parent: 1, type: 'province' },

        { id: 20, code: 'US-CA', name: 'California', parent: 2, type: 'state' },
        { id: 21, code: 'US-NY', name: 'New York', parent: 2, type: 'state' },
      ])

      /**
       * ZONE
       */
      await trx.table('zone').insert([
        { id: 1, name: 'EU' },
        { id: 2, name: 'North America' },
      ])

      /**
       * ZONE_REGIONS (pivot)
       */
      await trx.table('zone_regions').insert([
        { zone_id: 1, region_id: 1 },
        { zone_id: 1, region_id: 3 },
        { zone_id: 1, region_id: 4 },
        { zone_id: 2, region_id: 2 },
      ])
    })
  }
}

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class CustomersSeeder extends BaseSeeder {
  public async run() {
    await db.transaction(async (trx) => {
      await trx.from('customer_address').delete()
      await trx.from('customer').delete()

      // CUSTOMER
      await trx.table('customer').insert([
        { id: 1, email: 'jamie@example.com', user_id: 3, customer_group_id: 1 },
        { id: 2, email: 'giulia.rossi@example.com', user_id: null, customer_group_id: 2 },
        { id: 3, email: 'nicola.bianchi@example.com', user_id: null, customer_group_id: 2 },
        { id: 4, email: 'acme.procurement@example.com', user_id: null, customer_group_id: 1 },
      ])

      // CUSTOMER_ADDRESS
      await trx.table('customer_address').insert([
        {
          id: 1,
          customer_id: 1,
          is_default_shipping: true,
          is_default_billing: true,
          full_name: 'Jamie Rivera',
          company: null,
          street_line_1: 'Via Roma 12',
          street_line_2: null,
          city: 'Torino',
          province: 'TO',
          zip_code: '10121',
          phone_number: '+39 011 1234567',
          country_id: 1,
        },
        {
          id: 2,
          customer_id: 2,
          is_default_shipping: true,
          is_default_billing: true,
          full_name: 'Giulia Rossi',
          company: null,
          street_line_1: 'Corso Buenos Aires 45',
          street_line_2: 'Scala B',
          city: 'Milano',
          province: 'MI',
          zip_code: '20124',
          phone_number: '+39 02 7654321',
          country_id: 1,
        },
        {
          id: 3,
          customer_id: 3,
          is_default_shipping: true,
          is_default_billing: true,
          full_name: 'Nicola Bianchi',
          company: null,
          street_line_1: '221B Market St',
          street_line_2: null,
          city: 'San Francisco',
          province: 'CA',
          zip_code: '94103',
          phone_number: '+1 415 555 0101',
          country_id: 2,
        },
        {
          id: 4,
          customer_id: 4,
          is_default_shipping: true,
          is_default_billing: true,
          full_name: 'Taylor Morgan',
          company: 'Acme Corp',
          street_line_1: '350 5th Ave',
          street_line_2: 'Floor 21',
          city: 'New York',
          province: 'NY',
          zip_code: '10118',
          phone_number: '+1 212 555 0142',
          country_id: 2,
        },
      ])
    })
  }
}

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class UsersAndRolesSeeder extends BaseSeeder {
  public async run() {
    await db.transaction(async (trx) => {
      await trx.from('user_roles').delete()
      await trx.from('user').delete()

      await trx.table('user').insert([
        {
          id: 1,
          name: 'Matteo Frana',
          email: 'matteo@example.com',
          created_at: '2025-04-27 12:00:00',
        },
        {
          id: 2,
          name: 'Alex Chen',
          email: 'alex@example.com',
          created_at: '2025-06-26 12:00:00',
        },
        {
          id: 3,
          name: 'Jamie Rivera',
          email: 'jamie@example.com',
          created_at: '2025-08-25 12:00:00',
        },
      ])

      await trx.table('user_roles').insert([
        { user_id: 1, role_id: 1 },
        { user_id: 2, role_id: 2 },
        { user_id: 3, role_id: 3 },
      ])
    })
  }
}

import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'

export default class RolesAndPermissionsSeeder extends BaseSeeder {
  public async run() {
    await db.transaction(async (trx) => {
      await trx.from('role_permissions').delete()
      await trx.from('permission').delete()
      await trx.from('role').delete()

      await trx.table('role').insert([
        { id: 1, name: 'admin' },
        { id: 2, name: 'staff' },
        { id: 3, name: 'customer' },
      ])

      await trx.table('permission').insert([
        { id: 1, name: 'manage_products' },
        { id: 2, name: 'manage_orders' },
        { id: 3, name: 'manage_customers' },
        { id: 4, name: 'view_reports' },
        { id: 5, name: 'manage_settings' },
      ])

      await trx.table('role_permissions').insert([
        { role_id: 1, permission_id: 1 },
        { role_id: 1, permission_id: 2 },
        { role_id: 1, permission_id: 3 },
        { role_id: 1, permission_id: 4 },
        { role_id: 1, permission_id: 5 },
        { role_id: 2, permission_id: 1 },
        { role_id: 2, permission_id: 2 },
        { role_id: 2, permission_id: 3 },
        { role_id: 2, permission_id: 4 },
        { role_id: 3, permission_id: 2 },
      ])
    })
  }
}

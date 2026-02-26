// import { DateTime } from 'luxon'
// import hash from '@adonisjs/core/services/hash'
// import { compose } from '@adonisjs/core/helpers'
// import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
// import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
// import Role from './role.js'
// import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
// import Customer from './customer.js'

// const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
//   uids: ['email'],
//   passwordColumnName: 'password',
// })

// export default class User extends compose(BaseModel, AuthFinder) {
//   @column({ isPrimary: true })
//   declare id: number

//   @column()
//   declare name: string

//   @column()
//   declare email: string

//   // @column({ serializeAs: null })
//   // declare password: string

//   @column.dateTime({ autoCreate: true })
//   declare createdAt: DateTime

//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   declare updatedAt: DateTime | null

//   /*************  RELATIONS  *************/

//   @manyToMany(() => Role, {
//     localKey: 'id',
//     relatedKey: 'id',
//     pivotTable: 'user_roles',
//     pivotForeignKey: 'user_id',
//     pivotRelatedForeignKey: 'role_id',
//   })
//   declare roles: ManyToMany<typeof Role>

//   @hasMany(() => Customer)
//   declare customers: HasMany<typeof Customer>
// }

import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import Role from '#models/role'
import Customer from './customer.js'

export default class User extends BaseModel {
  static table = 'users'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Role, {
    pivotTable: 'user_roles',
    pivotForeignKey: 'user_id',
    pivotRelatedForeignKey: 'role_id',
  })
  declare roles: ManyToMany<typeof Role>

  @hasMany(() => Customer)
  declare customers: HasMany<typeof Customer>
}

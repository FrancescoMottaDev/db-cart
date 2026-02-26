/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AssetsController from '#controllers/assets_controller'
import router from '@adonisjs/core/services/router'

router
  .group(() => {
    router.get('/', [AssetsController, 'index']).as('api.assets.index')
    router.post('/', [AssetsController, 'store']).as('api.assets.store')
    router.get('/:id', [AssetsController, 'show']).as('api.assets.show')
    router.put('/:id', [AssetsController, 'update']).as('api.assets.update')
    router.delete('/:id', [AssetsController, 'destroy']).as('api.assets.destroy')
  })
  .prefix('/api/assets')

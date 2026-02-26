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
    router.get('/', [AssetsController, 'index'])
    router.post('/', [AssetsController, 'store'])
    router.get('/:id', [AssetsController, 'show'])
    router.put('/:id', [AssetsController, 'update'])
    router.delete('/:id', [AssetsController, 'destroy'])
  })
  .prefix('/api/assets')

/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AssetsController from '#controllers/assets_controller'
import TaxCategoriesController from '#controllers/tax_categories_controller'
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

router
  .group(() => {
    router.get('/', [TaxCategoriesController, 'index']).as('api.tax-categories.index')
    router.post('/', [TaxCategoriesController, 'store']).as('api.tax-categories.store')
    router.get('/:id', [TaxCategoriesController, 'show']).as('api.tax-categories.show')
    router.put('/:id', [TaxCategoriesController, 'update']).as('api.tax-categories.update')
    router.delete('/:id', [TaxCategoriesController, 'destroy']).as('api.tax-categories.destroy')
  })
  .prefix('/api/tax-categories')

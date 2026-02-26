/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const AssetsController = () => import('#controllers/assets_controller')
const CollectionsController = () => import('#controllers/collections_controller')
const PaymentMethodsController = () => import('#controllers/payment_methods_controller')
const ShippingCategoriesController = () => import('#controllers/shipping_categories_controller')
const StockLocationsController = () => import('#controllers/stock_locations_controller')
const TaxCategoriesController = () => import('#controllers/tax_categories_controller')
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
    router.get('/', [CollectionsController, 'index']).as('api.collections.index')
    router.post('/', [CollectionsController, 'store']).as('api.collections.store')
    router.get('/:id', [CollectionsController, 'show']).as('api.collections.show')
    router.put('/:id', [CollectionsController, 'update']).as('api.collections.update')
    router.delete('/:id', [CollectionsController, 'destroy']).as('api.collections.destroy')
  })
  .prefix('/api/collections')

router
  .group(() => {
    router.get('/', [PaymentMethodsController, 'index']).as('api.payment-methods.index')
    router.post('/', [PaymentMethodsController, 'store']).as('api.payment-methods.store')
    router.get('/:id', [PaymentMethodsController, 'show']).as('api.payment-methods.show')
    router.put('/:id', [PaymentMethodsController, 'update']).as('api.payment-methods.update')
    router.delete('/:id', [PaymentMethodsController, 'destroy']).as('api.payment-methods.destroy')
  })
  .prefix('/api/payment-methods')

router
  .group(() => {
    router.get('/', [TaxCategoriesController, 'index']).as('api.tax-categories.index')
    router.post('/', [TaxCategoriesController, 'store']).as('api.tax-categories.store')
    router.get('/:id', [TaxCategoriesController, 'show']).as('api.tax-categories.show')
    router.put('/:id', [TaxCategoriesController, 'update']).as('api.tax-categories.update')
    router.delete('/:id', [TaxCategoriesController, 'destroy']).as('api.tax-categories.destroy')
  })
  .prefix('/api/tax-categories')

router
  .group(() => {
    router.get('/', [ShippingCategoriesController, 'index']).as('api.shipping-categories.index')
    router.post('/', [ShippingCategoriesController, 'store']).as('api.shipping-categories.store')
    router.get('/:id', [ShippingCategoriesController, 'show']).as('api.shipping-categories.show')
    router
      .put('/:id', [ShippingCategoriesController, 'update'])
      .as('api.shipping-categories.update')
    router
      .delete('/:id', [ShippingCategoriesController, 'destroy'])
      .as('api.shipping-categories.destroy')
  })
  .prefix('/api/shipping-categories')

router
  .group(() => {
    router.get('/', [StockLocationsController, 'index']).as('api.stock-locations.index')
    router.post('/', [StockLocationsController, 'store']).as('api.stock-locations.store')
    router.get('/:id', [StockLocationsController, 'show']).as('api.stock-locations.show')
    router.put('/:id', [StockLocationsController, 'update']).as('api.stock-locations.update')
    router.delete('/:id', [StockLocationsController, 'destroy']).as('api.stock-locations.destroy')
  })
  .prefix('/api/stock-locations')

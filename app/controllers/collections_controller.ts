import type { HttpContext } from '@adonisjs/core/http'
import CollectionService from '#services/collection_service'
import CollectionTransformer from '#transformers/collection_transformer'
import { collectionIdParamValidator } from '#validators/collection/collection_id_param_validator'
import { createCollectionValidator } from '#validators/collection/create_collection_validator'
import { listCollectionsValidator } from '#validators/collection/list_collections_validator'
import { updateCollectionValidator } from '#validators/collection/update_collection_validator'

const collectionService = new CollectionService()

export default class CollectionsController {
  /**
   * GET /api/collections
   * Query support: ?page=1&perPage=20&q=summer&parentCollectionId=1
   */
  async index({ request, logger }: HttpContext) {
    const filters = await listCollectionsValidator.validate(request.qs())
    const collections = await collectionService.list(filters)

    logger.debug(
      {
        page: filters.page ?? 1,
        perPage: filters.perPage ?? 20,
        q: filters.q,
        parentCollectionId: filters.parentCollectionId,
        total: collections.total,
      },
      'collections.index'
    )

    return CollectionTransformer.paginated(collections)
  }

  /**
   * POST /api/collections
   */
  async store({ request, response, logger }: HttpContext) {
    const payload = await request.validateUsing(createCollectionValidator)
    const collection = await collectionService.create(payload)

    logger.info({ collectionId: collection.id }, 'collections.store')

    return response.created(CollectionTransformer.item(collection))
  }

  /**
   * GET /api/collections/:id
   */
  async show({ params }: HttpContext) {
    const { id } = await collectionIdParamValidator.validate(params)
    const collection = await collectionService.findByIdOrFail(id)

    return CollectionTransformer.item(collection)
  }

  /**
   * PUT /api/collections/:id
   */
  async update({ params, request, logger }: HttpContext) {
    const { id } = await collectionIdParamValidator.validate(params)
    const payload = await request.validateUsing(updateCollectionValidator)
    const collection = await collectionService.update(id, payload)

    logger.info(
      { collectionId: collection.id, changedFields: Object.keys(payload) },
      'collections.update'
    )

    return CollectionTransformer.item(collection)
  }

  /**
   * DELETE /api/collections/:id
   */
  async destroy({ params, response, logger }: HttpContext) {
    const { id } = await collectionIdParamValidator.validate(params)
    await collectionService.delete(id)

    logger.info({ collectionId: id }, 'collections.destroy')

    return response.noContent()
  }
}

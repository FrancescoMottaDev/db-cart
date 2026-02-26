import type Collection from '#models/collection'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class CollectionTransformer {
  static item(collection: Collection) {
    return {
      id: collection.id,
      code: collection.code,
      name: collection.name,
      parentCollectionId: collection.parentCollectionId,
    }
  }

  static paginated(paginator: ModelPaginatorContract<Collection>) {
    return {
      meta: paginator.getMeta(),
      data: paginator.all().map((collection) => this.item(collection)),
    }
  }
}

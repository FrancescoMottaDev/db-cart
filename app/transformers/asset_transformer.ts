import type Asset from '#models/asset'
import type { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

export default class AssetTransformer {
  static item(asset: Asset) {
    return {
      id: asset.id,
      name: asset.name,
      width: asset.width,
      height: asset.height,
    }
  }

  static paginated(paginator: ModelPaginatorContract<Asset>) {
    return {
      meta: paginator.getMeta(),
      data: paginator.all().map((asset) => this.item(asset)),
    }
  }
}

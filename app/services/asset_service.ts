import Asset from '#models/asset'

type ListAssetsInput = {
  page?: number
  perPage?: number
  q?: string
}

type CreateAssetInput = {
  name: string
  width: number
  height: number
}

type UpdateAssetInput = Partial<CreateAssetInput>

export default class AssetService {
  async list(filters: ListAssetsInput) {
    const page = filters.page ?? 1
    const perPage = filters.perPage ?? 20

    const query = Asset.query().orderBy('id', 'desc')

    if (filters.q) {
      query.whereILike('name', `%${filters.q}%`)
    }

    return query.paginate(page, perPage)
  }

  async create(payload: CreateAssetInput) {
    return Asset.create(payload)
  }

  async findByIdOrFail(id: number) {
    return Asset.findOrFail(id)
  }

  async update(id: number, payload: UpdateAssetInput) {
    const asset = await this.findByIdOrFail(id)

    asset.merge(payload)
    await asset.save()

    return asset
  }

  async delete(id: number) {
    const asset = await this.findByIdOrFail(id)
    await asset.delete()
  }
}

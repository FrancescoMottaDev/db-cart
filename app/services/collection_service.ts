import Collection from '#models/collection'
import { createError } from '@adonisjs/core/exceptions'

const InvalidCollectionParentException = createError(
  'Parent collection not found',
  'E_INVALID_COLLECTION_PARENT',
  422
)

const CollectionSelfParentException = createError(
  'Collection cannot be its own parent',
  'E_COLLECTION_SELF_PARENT',
  422
)

type ListCollectionsInput = {
  page?: number
  perPage?: number
  q?: string
  parentCollectionId?: number
}

type CreateCollectionInput = {
  code: string
  name: string
  parentCollectionId?: number | null
}

type UpdateCollectionInput = Partial<CreateCollectionInput>

export default class CollectionService {
  async list(filters: ListCollectionsInput) {
    const page = filters.page ?? 1
    const perPage = filters.perPage ?? 20

    const query = Collection.query().orderBy('id', 'desc')

    if (filters.q) {
      query.where((subQuery) => {
        subQuery.whereILike('code', `%${filters.q}%`).orWhereILike('name', `%${filters.q}%`)
      })
    }

    if (filters.parentCollectionId) {
      query.where('parent_collection_id', filters.parentCollectionId)
    }

    return query.paginate(page, perPage)
  }

  async create(payload: CreateCollectionInput) {
    await this.ensureValidParent(payload.parentCollectionId)

    return Collection.create({
      code: payload.code,
      name: payload.name,
      parentCollectionId: payload.parentCollectionId ?? null,
    })
  }

  async findByIdOrFail(id: number) {
    return Collection.findOrFail(id)
  }

  async update(id: number, payload: UpdateCollectionInput) {
    const collection = await this.findByIdOrFail(id)

    if ('parentCollectionId' in payload) {
      await this.ensureValidParent(payload.parentCollectionId, id)
    }

    collection.merge(payload)
    await collection.save()

    return collection
  }

  async delete(id: number) {
    const collection = await this.findByIdOrFail(id)
    await collection.delete()
  }

  private async ensureValidParent(
    parentCollectionId?: number | null,
    currentCollectionId?: number
  ) {
    if (parentCollectionId === undefined || parentCollectionId === null) {
      return
    }

    if (currentCollectionId !== undefined && parentCollectionId === currentCollectionId) {
      throw new CollectionSelfParentException()
    }

    const parentCollection = await Collection.find(parentCollectionId)

    if (!parentCollection) {
      throw new InvalidCollectionParentException()
    }
  }
}

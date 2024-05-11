import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Virtualcard } from './virtualcard.model'

export class VirtualcardApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Virtualcard>,
  ): Promise<Virtualcard[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/virtualcards${buildOptions}`)
  }

  static findOne(
    virtualcardId: string,
    queryOptions?: ApiHelper.QueryOptions<Virtualcard>,
  ): Promise<Virtualcard> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/virtualcards/${virtualcardId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Virtualcard>): Promise<Virtualcard> {
    return HttpService.api.post(`/v1/virtualcards`, values)
  }

  static updateOne(
    virtualcardId: string,
    values: Partial<Virtualcard>,
  ): Promise<Virtualcard> {
    return HttpService.api.patch(`/v1/virtualcards/${virtualcardId}`, values)
  }

  static deleteOne(virtualcardId: string): Promise<void> {
    return HttpService.api.delete(`/v1/virtualcards/${virtualcardId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Virtualcard>,
  ): Promise<Virtualcard[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/virtualcards${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Virtualcard>,
  ): Promise<Virtualcard> {
    return HttpService.api.post(`/v1/users/user/${userId}/virtualcards`, values)
  }
}

import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Transaction } from './transaction.model'

export class TransactionApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Transaction>,
  ): Promise<Transaction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/transactions${buildOptions}`)
  }

  static findOne(
    transactionId: string,
    queryOptions?: ApiHelper.QueryOptions<Transaction>,
  ): Promise<Transaction> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/transactions/${transactionId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Transaction>): Promise<Transaction> {
    return HttpService.api.post(`/v1/transactions`, values)
  }

  static updateOne(
    transactionId: string,
    values: Partial<Transaction>,
  ): Promise<Transaction> {
    return HttpService.api.patch(`/v1/transactions/${transactionId}`, values)
  }

  static deleteOne(transactionId: string): Promise<void> {
    return HttpService.api.delete(`/v1/transactions/${transactionId}`)
  }

  static findManyBySenderId(
    senderId: string,
    queryOptions?: ApiHelper.QueryOptions<Transaction>,
  ): Promise<Transaction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/sender/${senderId}/transactions${buildOptions}`,
    )
  }

  static createOneBySenderId(
    senderId: string,
    values: Partial<Transaction>,
  ): Promise<Transaction> {
    return HttpService.api.post(
      `/v1/users/sender/${senderId}/transactions`,
      values,
    )
  }

  static findManyByReceiverId(
    receiverId: string,
    queryOptions?: ApiHelper.QueryOptions<Transaction>,
  ): Promise<Transaction[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/receiver/${receiverId}/transactions${buildOptions}`,
    )
  }

  static createOneByReceiverId(
    receiverId: string,
    values: Partial<Transaction>,
  ): Promise<Transaction> {
    return HttpService.api.post(
      `/v1/users/receiver/${receiverId}/transactions`,
      values,
    )
  }
}

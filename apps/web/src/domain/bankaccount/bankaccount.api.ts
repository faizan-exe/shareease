import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Bankaccount } from './bankaccount.model'

export class BankaccountApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Bankaccount>,
  ): Promise<Bankaccount[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/bankaccounts${buildOptions}`)
  }

  static findOne(
    bankaccountId: string,
    queryOptions?: ApiHelper.QueryOptions<Bankaccount>,
  ): Promise<Bankaccount> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/bankaccounts/${bankaccountId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Bankaccount>): Promise<Bankaccount> {
    return HttpService.api.post(`/v1/bankaccounts`, values)
  }

  static updateOne(
    bankaccountId: string,
    values: Partial<Bankaccount>,
  ): Promise<Bankaccount> {
    return HttpService.api.patch(`/v1/bankaccounts/${bankaccountId}`, values)
  }

  static deleteOne(bankaccountId: string): Promise<void> {
    return HttpService.api.delete(`/v1/bankaccounts/${bankaccountId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Bankaccount>,
  ): Promise<Bankaccount[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/bankaccounts${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Bankaccount>,
  ): Promise<Bankaccount> {
    return HttpService.api.post(`/v1/users/user/${userId}/bankaccounts`, values)
  }
}

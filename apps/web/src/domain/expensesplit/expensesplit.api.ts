import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Expensesplit } from './expensesplit.model'

export class ExpensesplitApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Expensesplit>,
  ): Promise<Expensesplit[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/expensesplits${buildOptions}`)
  }

  static findOne(
    expensesplitId: string,
    queryOptions?: ApiHelper.QueryOptions<Expensesplit>,
  ): Promise<Expensesplit> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/expensesplits/${expensesplitId}${buildOptions}`,
    )
  }

  static createOne(values: Partial<Expensesplit>): Promise<Expensesplit> {
    return HttpService.api.post(`/v1/expensesplits`, values)
  }

  static updateOne(
    expensesplitId: string,
    values: Partial<Expensesplit>,
  ): Promise<Expensesplit> {
    return HttpService.api.patch(`/v1/expensesplits/${expensesplitId}`, values)
  }

  static deleteOne(expensesplitId: string): Promise<void> {
    return HttpService.api.delete(`/v1/expensesplits/${expensesplitId}`)
  }

  static findManyByExpenseId(
    expenseId: string,
    queryOptions?: ApiHelper.QueryOptions<Expensesplit>,
  ): Promise<Expensesplit[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/expenses/expense/${expenseId}/expensesplits${buildOptions}`,
    )
  }

  static createOneByExpenseId(
    expenseId: string,
    values: Partial<Expensesplit>,
  ): Promise<Expensesplit> {
    return HttpService.api.post(
      `/v1/expenses/expense/${expenseId}/expensesplits`,
      values,
    )
  }

  static findManyByOwedById(
    owedById: string,
    queryOptions?: ApiHelper.QueryOptions<Expensesplit>,
  ): Promise<Expensesplit[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/owedBy/${owedById}/expensesplits${buildOptions}`,
    )
  }

  static createOneByOwedById(
    owedById: string,
    values: Partial<Expensesplit>,
  ): Promise<Expensesplit> {
    return HttpService.api.post(
      `/v1/users/owedBy/${owedById}/expensesplits`,
      values,
    )
  }
}

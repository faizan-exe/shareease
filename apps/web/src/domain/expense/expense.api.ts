import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Expense } from './expense.model'

export class ExpenseApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Expense>,
  ): Promise<Expense[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/expenses${buildOptions}`)
  }

  static findOne(
    expenseId: string,
    queryOptions?: ApiHelper.QueryOptions<Expense>,
  ): Promise<Expense> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/expenses/${expenseId}${buildOptions}`)
  }

  static createOne(values: Partial<Expense>): Promise<Expense> {
    return HttpService.api.post(`/v1/expenses`, values)
  }

  static updateOne(
    expenseId: string,
    values: Partial<Expense>,
  ): Promise<Expense> {
    return HttpService.api.patch(`/v1/expenses/${expenseId}`, values)
  }

  static deleteOne(expenseId: string): Promise<void> {
    return HttpService.api.delete(`/v1/expenses/${expenseId}`)
  }

  static findManyByPaidById(
    paidById: string,
    queryOptions?: ApiHelper.QueryOptions<Expense>,
  ): Promise<Expense[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/paidBy/${paidById}/expenses${buildOptions}`,
    )
  }

  static createOneByPaidById(
    paidById: string,
    values: Partial<Expense>,
  ): Promise<Expense> {
    return HttpService.api.post(`/v1/users/paidBy/${paidById}/expenses`, values)
  }

  static findManyByGroupId(
    groupId: string,
    queryOptions?: ApiHelper.QueryOptions<Expense>,
  ): Promise<Expense[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groups/group/${groupId}/expenses${buildOptions}`,
    )
  }

  static createOneByGroupId(
    groupId: string,
    values: Partial<Expense>,
  ): Promise<Expense> {
    return HttpService.api.post(`/v1/groups/group/${groupId}/expenses`, values)
  }
}

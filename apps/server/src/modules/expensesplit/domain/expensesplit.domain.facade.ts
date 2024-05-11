import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Expensesplit } from './expensesplit.model'

import { Expense } from '../../expense/domain'

import { User } from '../../user/domain'

@Injectable()
export class ExpensesplitDomainFacade {
  constructor(
    @InjectRepository(Expensesplit)
    private repository: Repository<Expensesplit>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Expensesplit>): Promise<Expensesplit> {
    return this.repository.save(values)
  }

  async update(
    item: Expensesplit,
    values: Partial<Expensesplit>,
  ): Promise<Expensesplit> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Expensesplit): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Expensesplit> = {},
  ): Promise<Expensesplit[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Expensesplit> = {},
  ): Promise<Expensesplit> {
    if (!id) {
      this.databaseHelper.invalidQueryWhere('id')
    }

    const queryOptionsEnsured = {
      includes: queryOptions?.includes,
      filters: {
        id: id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    const item = await query.getOne()

    if (!item) {
      this.databaseHelper.notFoundByQuery(queryOptionsEnsured.filters)
    }

    return item
  }

  async findManyByExpense(
    item: Expense,
    queryOptions: RequestHelper.QueryOptions<Expensesplit> = {},
  ): Promise<Expensesplit[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('expense')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        expenseId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByOwedBy(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Expensesplit> = {},
  ): Promise<Expensesplit[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('owedBy')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        owedById: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}

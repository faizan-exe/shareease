import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Expense } from './expense.model'

import { User } from '../../user/domain'

import { Group } from '../../group/domain'

@Injectable()
export class ExpenseDomainFacade {
  constructor(
    @InjectRepository(Expense)
    private repository: Repository<Expense>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Expense>): Promise<Expense> {
    return this.repository.save(values)
  }

  async update(item: Expense, values: Partial<Expense>): Promise<Expense> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Expense): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Expense> = {},
  ): Promise<Expense[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Expense> = {},
  ): Promise<Expense> {
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

  async findManyByPaidBy(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Expense> = {},
  ): Promise<Expense[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('paidBy')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        paidById: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }

  async findManyByGroup(
    item: Group,
    queryOptions: RequestHelper.QueryOptions<Expense> = {},
  ): Promise<Expense[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('group')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        groupId: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}

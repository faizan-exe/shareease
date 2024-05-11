import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { DatabaseHelper } from '../../../core/database'
import { RequestHelper } from '../../../helpers/request'
import { Invitation } from './invitation.model'

import { Group } from '../../group/domain'

import { User } from '../../user/domain'

@Injectable()
export class InvitationDomainFacade {
  constructor(
    @InjectRepository(Invitation)
    private repository: Repository<Invitation>,
    private databaseHelper: DatabaseHelper,
  ) {}

  async create(values: Partial<Invitation>): Promise<Invitation> {
    return this.repository.save(values)
  }

  async update(
    item: Invitation,
    values: Partial<Invitation>,
  ): Promise<Invitation> {
    const itemUpdated = { ...item, ...values }

    return this.repository.save(itemUpdated)
  }

  async delete(item: Invitation): Promise<void> {
    await this.repository.softDelete(item.id)
  }

  async findMany(
    queryOptions: RequestHelper.QueryOptions<Invitation> = {},
  ): Promise<Invitation[]> {
    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptions,
    )

    return query.getMany()
  }

  async findOneByIdOrFail(
    id: string,
    queryOptions: RequestHelper.QueryOptions<Invitation> = {},
  ): Promise<Invitation> {
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

  async findManyByGroup(
    item: Group,
    queryOptions: RequestHelper.QueryOptions<Invitation> = {},
  ): Promise<Invitation[]> {
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

  async findManyByInvitedBy(
    item: User,
    queryOptions: RequestHelper.QueryOptions<Invitation> = {},
  ): Promise<Invitation[]> {
    if (!item) {
      this.databaseHelper.invalidQueryWhere('invitedBy')
    }

    const queryOptionsEnsured = {
      includes: queryOptions.includes,
      orders: queryOptions.orders,
      filters: {
        ...queryOptions.filters,
        invitedById: item.id,
      },
    }

    const query = this.databaseHelper.applyQueryOptions(
      this.repository,
      queryOptionsEnsured,
    )

    return query.getMany()
  }
}

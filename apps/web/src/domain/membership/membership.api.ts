import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Membership } from './membership.model'

export class MembershipApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Membership>,
  ): Promise<Membership[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/memberships${buildOptions}`)
  }

  static findOne(
    membershipId: string,
    queryOptions?: ApiHelper.QueryOptions<Membership>,
  ): Promise<Membership> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/memberships/${membershipId}${buildOptions}`)
  }

  static createOne(values: Partial<Membership>): Promise<Membership> {
    return HttpService.api.post(`/v1/memberships`, values)
  }

  static updateOne(
    membershipId: string,
    values: Partial<Membership>,
  ): Promise<Membership> {
    return HttpService.api.patch(`/v1/memberships/${membershipId}`, values)
  }

  static deleteOne(membershipId: string): Promise<void> {
    return HttpService.api.delete(`/v1/memberships/${membershipId}`)
  }

  static findManyByUserId(
    userId: string,
    queryOptions?: ApiHelper.QueryOptions<Membership>,
  ): Promise<Membership[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/user/${userId}/memberships${buildOptions}`,
    )
  }

  static createOneByUserId(
    userId: string,
    values: Partial<Membership>,
  ): Promise<Membership> {
    return HttpService.api.post(`/v1/users/user/${userId}/memberships`, values)
  }

  static findManyByGroupId(
    groupId: string,
    queryOptions?: ApiHelper.QueryOptions<Membership>,
  ): Promise<Membership[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groups/group/${groupId}/memberships${buildOptions}`,
    )
  }

  static createOneByGroupId(
    groupId: string,
    values: Partial<Membership>,
  ): Promise<Membership> {
    return HttpService.api.post(
      `/v1/groups/group/${groupId}/memberships`,
      values,
    )
  }
}

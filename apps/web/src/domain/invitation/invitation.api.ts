import { HttpService } from '../../core/http'
import { ApiHelper } from '../helpers/api.helper'
import { Invitation } from './invitation.model'

export class InvitationApi {
  static findMany(
    queryOptions?: ApiHelper.QueryOptions<Invitation>,
  ): Promise<Invitation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/invitations${buildOptions}`)
  }

  static findOne(
    invitationId: string,
    queryOptions?: ApiHelper.QueryOptions<Invitation>,
  ): Promise<Invitation> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(`/v1/invitations/${invitationId}${buildOptions}`)
  }

  static createOne(values: Partial<Invitation>): Promise<Invitation> {
    return HttpService.api.post(`/v1/invitations`, values)
  }

  static updateOne(
    invitationId: string,
    values: Partial<Invitation>,
  ): Promise<Invitation> {
    return HttpService.api.patch(`/v1/invitations/${invitationId}`, values)
  }

  static deleteOne(invitationId: string): Promise<void> {
    return HttpService.api.delete(`/v1/invitations/${invitationId}`)
  }

  static findManyByGroupId(
    groupId: string,
    queryOptions?: ApiHelper.QueryOptions<Invitation>,
  ): Promise<Invitation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/groups/group/${groupId}/invitations${buildOptions}`,
    )
  }

  static createOneByGroupId(
    groupId: string,
    values: Partial<Invitation>,
  ): Promise<Invitation> {
    return HttpService.api.post(
      `/v1/groups/group/${groupId}/invitations`,
      values,
    )
  }

  static findManyByInvitedById(
    invitedById: string,
    queryOptions?: ApiHelper.QueryOptions<Invitation>,
  ): Promise<Invitation[]> {
    const buildOptions = ApiHelper.buildQueryOptions(queryOptions)

    return HttpService.api.get(
      `/v1/users/invitedBy/${invitedById}/invitations${buildOptions}`,
    )
  }

  static createOneByInvitedById(
    invitedById: string,
    values: Partial<Invitation>,
  ): Promise<Invitation> {
    return HttpService.api.post(
      `/v1/users/invitedBy/${invitedById}/invitations`,
      values,
    )
  }
}

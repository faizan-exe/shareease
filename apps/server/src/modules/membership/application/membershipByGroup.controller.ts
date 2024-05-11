import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { MembershipDomainFacade } from '@server/modules/membership/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { MembershipApplicationEvent } from './membership.application.event'
import { MembershipCreateDto } from './membership.dto'

import { GroupDomainFacade } from '../../group/domain'

@Controller('/v1/groups')
export class MembershipByGroupController {
  constructor(
    private groupDomainFacade: GroupDomainFacade,

    private membershipDomainFacade: MembershipDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/group/:groupId/memberships')
  async findManyGroupId(
    @Param('groupId') groupId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.groupDomainFacade.findOneByIdOrFail(groupId)

    const items = await this.membershipDomainFacade.findManyByGroup(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/group/:groupId/memberships')
  async createByGroupId(
    @Param('groupId') groupId: string,
    @Body() body: MembershipCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, groupId }

    const item = await this.membershipDomainFacade.create(valuesUpdated)

    await this.eventService.emit<MembershipApplicationEvent.MembershipCreated.Payload>(
      MembershipApplicationEvent.MembershipCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { InvitationDomainFacade } from '@server/modules/invitation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { InvitationApplicationEvent } from './invitation.application.event'
import { InvitationCreateDto } from './invitation.dto'

import { GroupDomainFacade } from '../../group/domain'

@Controller('/v1/groups')
export class InvitationByGroupController {
  constructor(
    private groupDomainFacade: GroupDomainFacade,

    private invitationDomainFacade: InvitationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/group/:groupId/invitations')
  async findManyGroupId(
    @Param('groupId') groupId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.groupDomainFacade.findOneByIdOrFail(groupId)

    const items = await this.invitationDomainFacade.findManyByGroup(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/group/:groupId/invitations')
  async createByGroupId(
    @Param('groupId') groupId: string,
    @Body() body: InvitationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, groupId }

    const item = await this.invitationDomainFacade.create(valuesUpdated)

    await this.eventService.emit<InvitationApplicationEvent.InvitationCreated.Payload>(
      InvitationApplicationEvent.InvitationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

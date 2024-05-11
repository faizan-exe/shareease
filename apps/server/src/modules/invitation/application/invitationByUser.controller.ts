import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { InvitationDomainFacade } from '@server/modules/invitation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { InvitationApplicationEvent } from './invitation.application.event'
import { InvitationCreateDto } from './invitation.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class InvitationByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private invitationDomainFacade: InvitationDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/invitedBy/:invitedById/invitations')
  async findManyInvitedById(
    @Param('invitedById') invitedById: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(invitedById)

    const items = await this.invitationDomainFacade.findManyByInvitedBy(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/invitedBy/:invitedById/invitations')
  async createByInvitedById(
    @Param('invitedById') invitedById: string,
    @Body() body: InvitationCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, invitedById }

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

import { Request } from 'express'

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common'
import { EventService } from '@server/libraries/event'
import {
  Invitation,
  InvitationDomainFacade,
} from '@server/modules/invitation/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { InvitationApplicationEvent } from './invitation.application.event'
import { InvitationCreateDto, InvitationUpdateDto } from './invitation.dto'

@Controller('/v1/invitations')
export class InvitationController {
  constructor(
    private eventService: EventService,
    private invitationDomainFacade: InvitationDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.invitationDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: InvitationCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.invitationDomainFacade.create(body)

    await this.eventService.emit<InvitationApplicationEvent.InvitationCreated.Payload>(
      InvitationApplicationEvent.InvitationCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:invitationId')
  async findOne(
    @Param('invitationId') invitationId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.invitationDomainFacade.findOneByIdOrFail(
      invitationId,
      queryOptions,
    )

    return item
  }

  @Patch('/:invitationId')
  async update(
    @Param('invitationId') invitationId: string,
    @Body() body: InvitationUpdateDto,
  ) {
    const item =
      await this.invitationDomainFacade.findOneByIdOrFail(invitationId)

    const itemUpdated = await this.invitationDomainFacade.update(
      item,
      body as Partial<Invitation>,
    )
    return itemUpdated
  }

  @Delete('/:invitationId')
  async delete(@Param('invitationId') invitationId: string) {
    const item =
      await this.invitationDomainFacade.findOneByIdOrFail(invitationId)

    await this.invitationDomainFacade.delete(item)

    return item
  }
}

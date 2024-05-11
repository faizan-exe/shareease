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
  Membership,
  MembershipDomainFacade,
} from '@server/modules/membership/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { MembershipApplicationEvent } from './membership.application.event'
import { MembershipCreateDto, MembershipUpdateDto } from './membership.dto'

@Controller('/v1/memberships')
export class MembershipController {
  constructor(
    private eventService: EventService,
    private membershipDomainFacade: MembershipDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.membershipDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: MembershipCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.membershipDomainFacade.create(body)

    await this.eventService.emit<MembershipApplicationEvent.MembershipCreated.Payload>(
      MembershipApplicationEvent.MembershipCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:membershipId')
  async findOne(
    @Param('membershipId') membershipId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.membershipDomainFacade.findOneByIdOrFail(
      membershipId,
      queryOptions,
    )

    return item
  }

  @Patch('/:membershipId')
  async update(
    @Param('membershipId') membershipId: string,
    @Body() body: MembershipUpdateDto,
  ) {
    const item =
      await this.membershipDomainFacade.findOneByIdOrFail(membershipId)

    const itemUpdated = await this.membershipDomainFacade.update(
      item,
      body as Partial<Membership>,
    )
    return itemUpdated
  }

  @Delete('/:membershipId')
  async delete(@Param('membershipId') membershipId: string) {
    const item =
      await this.membershipDomainFacade.findOneByIdOrFail(membershipId)

    await this.membershipDomainFacade.delete(item)

    return item
  }
}

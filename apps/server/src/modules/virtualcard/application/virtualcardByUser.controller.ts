import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { VirtualcardDomainFacade } from '@server/modules/virtualcard/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { VirtualcardApplicationEvent } from './virtualcard.application.event'
import { VirtualcardCreateDto } from './virtualcard.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class VirtualcardByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private virtualcardDomainFacade: VirtualcardDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/virtualcards')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.virtualcardDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/virtualcards')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: VirtualcardCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.virtualcardDomainFacade.create(valuesUpdated)

    await this.eventService.emit<VirtualcardApplicationEvent.VirtualcardCreated.Payload>(
      VirtualcardApplicationEvent.VirtualcardCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

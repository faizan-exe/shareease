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
  Virtualcard,
  VirtualcardDomainFacade,
} from '@server/modules/virtualcard/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { VirtualcardApplicationEvent } from './virtualcard.application.event'
import { VirtualcardCreateDto, VirtualcardUpdateDto } from './virtualcard.dto'

@Controller('/v1/virtualcards')
export class VirtualcardController {
  constructor(
    private eventService: EventService,
    private virtualcardDomainFacade: VirtualcardDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.virtualcardDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: VirtualcardCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.virtualcardDomainFacade.create(body)

    await this.eventService.emit<VirtualcardApplicationEvent.VirtualcardCreated.Payload>(
      VirtualcardApplicationEvent.VirtualcardCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:virtualcardId')
  async findOne(
    @Param('virtualcardId') virtualcardId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.virtualcardDomainFacade.findOneByIdOrFail(
      virtualcardId,
      queryOptions,
    )

    return item
  }

  @Patch('/:virtualcardId')
  async update(
    @Param('virtualcardId') virtualcardId: string,
    @Body() body: VirtualcardUpdateDto,
  ) {
    const item =
      await this.virtualcardDomainFacade.findOneByIdOrFail(virtualcardId)

    const itemUpdated = await this.virtualcardDomainFacade.update(
      item,
      body as Partial<Virtualcard>,
    )
    return itemUpdated
  }

  @Delete('/:virtualcardId')
  async delete(@Param('virtualcardId') virtualcardId: string) {
    const item =
      await this.virtualcardDomainFacade.findOneByIdOrFail(virtualcardId)

    await this.virtualcardDomainFacade.delete(item)

    return item
  }
}

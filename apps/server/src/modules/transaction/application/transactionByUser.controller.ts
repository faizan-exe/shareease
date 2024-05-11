import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { TransactionDomainFacade } from '@server/modules/transaction/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { TransactionApplicationEvent } from './transaction.application.event'
import { TransactionCreateDto } from './transaction.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class TransactionByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private transactionDomainFacade: TransactionDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/sender/:senderId/transactions')
  async findManySenderId(
    @Param('senderId') senderId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(senderId)

    const items = await this.transactionDomainFacade.findManyBySender(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/sender/:senderId/transactions')
  async createBySenderId(
    @Param('senderId') senderId: string,
    @Body() body: TransactionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, senderId }

    const item = await this.transactionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TransactionApplicationEvent.TransactionCreated.Payload>(
      TransactionApplicationEvent.TransactionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/receiver/:receiverId/transactions')
  async findManyReceiverId(
    @Param('receiverId') receiverId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(receiverId)

    const items = await this.transactionDomainFacade.findManyByReceiver(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/receiver/:receiverId/transactions')
  async createByReceiverId(
    @Param('receiverId') receiverId: string,
    @Body() body: TransactionCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, receiverId }

    const item = await this.transactionDomainFacade.create(valuesUpdated)

    await this.eventService.emit<TransactionApplicationEvent.TransactionCreated.Payload>(
      TransactionApplicationEvent.TransactionCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

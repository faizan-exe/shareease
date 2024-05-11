import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { BankaccountDomainFacade } from '@server/modules/bankaccount/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { BankaccountApplicationEvent } from './bankaccount.application.event'
import { BankaccountCreateDto } from './bankaccount.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class BankaccountByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private bankaccountDomainFacade: BankaccountDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/user/:userId/bankaccounts')
  async findManyUserId(
    @Param('userId') userId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(userId)

    const items = await this.bankaccountDomainFacade.findManyByUser(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/user/:userId/bankaccounts')
  async createByUserId(
    @Param('userId') userId: string,
    @Body() body: BankaccountCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, userId }

    const item = await this.bankaccountDomainFacade.create(valuesUpdated)

    await this.eventService.emit<BankaccountApplicationEvent.BankaccountCreated.Payload>(
      BankaccountApplicationEvent.BankaccountCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

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
  Bankaccount,
  BankaccountDomainFacade,
} from '@server/modules/bankaccount/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { BankaccountApplicationEvent } from './bankaccount.application.event'
import { BankaccountCreateDto, BankaccountUpdateDto } from './bankaccount.dto'

@Controller('/v1/bankaccounts')
export class BankaccountController {
  constructor(
    private eventService: EventService,
    private bankaccountDomainFacade: BankaccountDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.bankaccountDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: BankaccountCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.bankaccountDomainFacade.create(body)

    await this.eventService.emit<BankaccountApplicationEvent.BankaccountCreated.Payload>(
      BankaccountApplicationEvent.BankaccountCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:bankaccountId')
  async findOne(
    @Param('bankaccountId') bankaccountId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.bankaccountDomainFacade.findOneByIdOrFail(
      bankaccountId,
      queryOptions,
    )

    return item
  }

  @Patch('/:bankaccountId')
  async update(
    @Param('bankaccountId') bankaccountId: string,
    @Body() body: BankaccountUpdateDto,
  ) {
    const item =
      await this.bankaccountDomainFacade.findOneByIdOrFail(bankaccountId)

    const itemUpdated = await this.bankaccountDomainFacade.update(
      item,
      body as Partial<Bankaccount>,
    )
    return itemUpdated
  }

  @Delete('/:bankaccountId')
  async delete(@Param('bankaccountId') bankaccountId: string) {
    const item =
      await this.bankaccountDomainFacade.findOneByIdOrFail(bankaccountId)

    await this.bankaccountDomainFacade.delete(item)

    return item
  }
}

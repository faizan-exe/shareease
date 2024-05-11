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
  Expensesplit,
  ExpensesplitDomainFacade,
} from '@server/modules/expensesplit/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ExpensesplitApplicationEvent } from './expensesplit.application.event'
import {
  ExpensesplitCreateDto,
  ExpensesplitUpdateDto,
} from './expensesplit.dto'

@Controller('/v1/expensesplits')
export class ExpensesplitController {
  constructor(
    private eventService: EventService,
    private expensesplitDomainFacade: ExpensesplitDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.expensesplitDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ExpensesplitCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.expensesplitDomainFacade.create(body)

    await this.eventService.emit<ExpensesplitApplicationEvent.ExpensesplitCreated.Payload>(
      ExpensesplitApplicationEvent.ExpensesplitCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:expensesplitId')
  async findOne(
    @Param('expensesplitId') expensesplitId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.expensesplitDomainFacade.findOneByIdOrFail(
      expensesplitId,
      queryOptions,
    )

    return item
  }

  @Patch('/:expensesplitId')
  async update(
    @Param('expensesplitId') expensesplitId: string,
    @Body() body: ExpensesplitUpdateDto,
  ) {
    const item =
      await this.expensesplitDomainFacade.findOneByIdOrFail(expensesplitId)

    const itemUpdated = await this.expensesplitDomainFacade.update(
      item,
      body as Partial<Expensesplit>,
    )
    return itemUpdated
  }

  @Delete('/:expensesplitId')
  async delete(@Param('expensesplitId') expensesplitId: string) {
    const item =
      await this.expensesplitDomainFacade.findOneByIdOrFail(expensesplitId)

    await this.expensesplitDomainFacade.delete(item)

    return item
  }
}

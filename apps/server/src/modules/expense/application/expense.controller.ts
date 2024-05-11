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
import { Expense, ExpenseDomainFacade } from '@server/modules/expense/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { RequestHelper } from '../../../helpers/request'
import { ExpenseApplicationEvent } from './expense.application.event'
import { ExpenseCreateDto, ExpenseUpdateDto } from './expense.dto'

@Controller('/v1/expenses')
export class ExpenseController {
  constructor(
    private eventService: EventService,
    private expenseDomainFacade: ExpenseDomainFacade,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/')
  async findMany(@Req() request: Request) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const items = await this.expenseDomainFacade.findMany(queryOptions)

    return items
  }

  @Post('/')
  async create(@Body() body: ExpenseCreateDto, @Req() request: Request) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const item = await this.expenseDomainFacade.create(body)

    await this.eventService.emit<ExpenseApplicationEvent.ExpenseCreated.Payload>(
      ExpenseApplicationEvent.ExpenseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }

  @Get('/:expenseId')
  async findOne(
    @Param('expenseId') expenseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const item = await this.expenseDomainFacade.findOneByIdOrFail(
      expenseId,
      queryOptions,
    )

    return item
  }

  @Patch('/:expenseId')
  async update(
    @Param('expenseId') expenseId: string,
    @Body() body: ExpenseUpdateDto,
  ) {
    const item = await this.expenseDomainFacade.findOneByIdOrFail(expenseId)

    const itemUpdated = await this.expenseDomainFacade.update(
      item,
      body as Partial<Expense>,
    )
    return itemUpdated
  }

  @Delete('/:expenseId')
  async delete(@Param('expenseId') expenseId: string) {
    const item = await this.expenseDomainFacade.findOneByIdOrFail(expenseId)

    await this.expenseDomainFacade.delete(item)

    return item
  }
}

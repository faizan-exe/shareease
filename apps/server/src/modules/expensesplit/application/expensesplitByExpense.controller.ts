import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ExpensesplitDomainFacade } from '@server/modules/expensesplit/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ExpensesplitApplicationEvent } from './expensesplit.application.event'
import { ExpensesplitCreateDto } from './expensesplit.dto'

import { ExpenseDomainFacade } from '../../expense/domain'

@Controller('/v1/expenses')
export class ExpensesplitByExpenseController {
  constructor(
    private expenseDomainFacade: ExpenseDomainFacade,

    private expensesplitDomainFacade: ExpensesplitDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/expense/:expenseId/expensesplits')
  async findManyExpenseId(
    @Param('expenseId') expenseId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.expenseDomainFacade.findOneByIdOrFail(expenseId)

    const items = await this.expensesplitDomainFacade.findManyByExpense(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/expense/:expenseId/expensesplits')
  async createByExpenseId(
    @Param('expenseId') expenseId: string,
    @Body() body: ExpensesplitCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, expenseId }

    const item = await this.expensesplitDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ExpensesplitApplicationEvent.ExpensesplitCreated.Payload>(
      ExpensesplitApplicationEvent.ExpensesplitCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

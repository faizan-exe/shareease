import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ExpenseDomainFacade } from '@server/modules/expense/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ExpenseApplicationEvent } from './expense.application.event'
import { ExpenseCreateDto } from './expense.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ExpenseByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private expenseDomainFacade: ExpenseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/paidBy/:paidById/expenses')
  async findManyPaidById(
    @Param('paidById') paidById: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(paidById)

    const items = await this.expenseDomainFacade.findManyByPaidBy(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/paidBy/:paidById/expenses')
  async createByPaidById(
    @Param('paidById') paidById: string,
    @Body() body: ExpenseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, paidById }

    const item = await this.expenseDomainFacade.create(valuesUpdated)

    await this.eventService.emit<ExpenseApplicationEvent.ExpenseCreated.Payload>(
      ExpenseApplicationEvent.ExpenseCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

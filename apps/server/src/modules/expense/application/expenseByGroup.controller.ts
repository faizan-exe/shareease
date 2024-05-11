import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ExpenseDomainFacade } from '@server/modules/expense/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ExpenseApplicationEvent } from './expense.application.event'
import { ExpenseCreateDto } from './expense.dto'

import { GroupDomainFacade } from '../../group/domain'

@Controller('/v1/groups')
export class ExpenseByGroupController {
  constructor(
    private groupDomainFacade: GroupDomainFacade,

    private expenseDomainFacade: ExpenseDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/group/:groupId/expenses')
  async findManyGroupId(
    @Param('groupId') groupId: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.groupDomainFacade.findOneByIdOrFail(groupId)

    const items = await this.expenseDomainFacade.findManyByGroup(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/group/:groupId/expenses')
  async createByGroupId(
    @Param('groupId') groupId: string,
    @Body() body: ExpenseCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, groupId }

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

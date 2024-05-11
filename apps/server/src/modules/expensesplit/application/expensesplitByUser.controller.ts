import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { ExpensesplitDomainFacade } from '@server/modules/expensesplit/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { ExpensesplitApplicationEvent } from './expensesplit.application.event'
import { ExpensesplitCreateDto } from './expensesplit.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class ExpensesplitByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private expensesplitDomainFacade: ExpensesplitDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/owedBy/:owedById/expensesplits')
  async findManyOwedById(
    @Param('owedById') owedById: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(owedById)

    const items = await this.expensesplitDomainFacade.findManyByOwedBy(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/owedBy/:owedById/expensesplits')
  async createByOwedById(
    @Param('owedById') owedById: string,
    @Body() body: ExpensesplitCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, owedById }

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

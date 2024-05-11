import { Request } from 'express'

import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common'
import { RequestHelper } from '@server/helpers/request'
import { EventService } from '@server/libraries/event'
import { GroupDomainFacade } from '@server/modules/group/domain'
import { AuthenticationDomainFacade } from '@server/modules/authentication/domain'
import { GroupApplicationEvent } from './group.application.event'
import { GroupCreateDto } from './group.dto'

import { UserDomainFacade } from '../../user/domain'

@Controller('/v1/users')
export class GroupByUserController {
  constructor(
    private userDomainFacade: UserDomainFacade,

    private groupDomainFacade: GroupDomainFacade,
    private eventService: EventService,
    private authenticationDomainFacade: AuthenticationDomainFacade,
  ) {}

  @Get('/createdBy/:createdById/groups')
  async findManyCreatedById(
    @Param('createdById') createdById: string,
    @Req() request: Request,
  ) {
    const queryOptions = RequestHelper.getQueryOptions(request)

    const parent = await this.userDomainFacade.findOneByIdOrFail(createdById)

    const items = await this.groupDomainFacade.findManyByCreatedBy(
      parent,
      queryOptions,
    )

    return items
  }

  @Post('/createdBy/:createdById/groups')
  async createByCreatedById(
    @Param('createdById') createdById: string,
    @Body() body: GroupCreateDto,
    @Req() request: Request,
  ) {
    const { user } = this.authenticationDomainFacade.getRequestPayload(request)

    const valuesUpdated = { ...body, createdById }

    const item = await this.groupDomainFacade.create(valuesUpdated)

    await this.eventService.emit<GroupApplicationEvent.GroupCreated.Payload>(
      GroupApplicationEvent.GroupCreated.key,
      {
        id: item.id,
        userId: user.id,
      },
    )

    return item
  }
}

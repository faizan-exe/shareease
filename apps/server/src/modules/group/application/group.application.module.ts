import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { GroupDomainModule } from '../domain'
import { GroupController } from './group.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { GroupByUserController } from './groupByUser.controller'

@Module({
  imports: [AuthenticationDomainModule, GroupDomainModule, UserDomainModule],
  controllers: [GroupController, GroupByUserController],
  providers: [],
})
export class GroupApplicationModule {}

import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { MembershipDomainModule } from '../domain'
import { MembershipController } from './membership.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { MembershipByUserController } from './membershipByUser.controller'

import { GroupDomainModule } from '../../../modules/group/domain'

import { MembershipByGroupController } from './membershipByGroup.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    MembershipDomainModule,

    UserDomainModule,

    GroupDomainModule,
  ],
  controllers: [
    MembershipController,

    MembershipByUserController,

    MembershipByGroupController,
  ],
  providers: [],
})
export class MembershipApplicationModule {}

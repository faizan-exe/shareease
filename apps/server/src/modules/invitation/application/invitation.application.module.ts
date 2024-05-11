import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { InvitationDomainModule } from '../domain'
import { InvitationController } from './invitation.controller'

import { GroupDomainModule } from '../../../modules/group/domain'

import { InvitationByGroupController } from './invitationByGroup.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { InvitationByUserController } from './invitationByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    InvitationDomainModule,

    GroupDomainModule,

    UserDomainModule,
  ],
  controllers: [
    InvitationController,

    InvitationByGroupController,

    InvitationByUserController,
  ],
  providers: [],
})
export class InvitationApplicationModule {}

import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { VirtualcardDomainModule } from '../domain'
import { VirtualcardController } from './virtualcard.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { VirtualcardByUserController } from './virtualcardByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    VirtualcardDomainModule,

    UserDomainModule,
  ],
  controllers: [VirtualcardController, VirtualcardByUserController],
  providers: [],
})
export class VirtualcardApplicationModule {}

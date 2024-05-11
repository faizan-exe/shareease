import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { BankaccountDomainModule } from '../domain'
import { BankaccountController } from './bankaccount.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { BankaccountByUserController } from './bankaccountByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    BankaccountDomainModule,

    UserDomainModule,
  ],
  controllers: [BankaccountController, BankaccountByUserController],
  providers: [],
})
export class BankaccountApplicationModule {}

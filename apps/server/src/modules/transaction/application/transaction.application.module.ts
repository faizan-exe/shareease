import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { TransactionDomainModule } from '../domain'
import { TransactionController } from './transaction.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { TransactionByUserController } from './transactionByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    TransactionDomainModule,

    UserDomainModule,
  ],
  controllers: [TransactionController, TransactionByUserController],
  providers: [],
})
export class TransactionApplicationModule {}

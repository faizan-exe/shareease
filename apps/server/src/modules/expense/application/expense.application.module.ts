import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ExpenseDomainModule } from '../domain'
import { ExpenseController } from './expense.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ExpenseByUserController } from './expenseByUser.controller'

import { GroupDomainModule } from '../../../modules/group/domain'

import { ExpenseByGroupController } from './expenseByGroup.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ExpenseDomainModule,

    UserDomainModule,

    GroupDomainModule,
  ],
  controllers: [
    ExpenseController,

    ExpenseByUserController,

    ExpenseByGroupController,
  ],
  providers: [],
})
export class ExpenseApplicationModule {}

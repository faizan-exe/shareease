import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from '@server/modules/authentication/domain'
import { ExpensesplitDomainModule } from '../domain'
import { ExpensesplitController } from './expensesplit.controller'

import { ExpenseDomainModule } from '../../../modules/expense/domain'

import { ExpensesplitByExpenseController } from './expensesplitByExpense.controller'

import { UserDomainModule } from '../../../modules/user/domain'

import { ExpensesplitByUserController } from './expensesplitByUser.controller'

@Module({
  imports: [
    AuthenticationDomainModule,
    ExpensesplitDomainModule,

    ExpenseDomainModule,

    UserDomainModule,
  ],
  controllers: [
    ExpensesplitController,

    ExpensesplitByExpenseController,

    ExpensesplitByUserController,
  ],
  providers: [],
})
export class ExpensesplitApplicationModule {}

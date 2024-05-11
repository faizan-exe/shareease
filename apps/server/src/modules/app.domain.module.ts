import { Module } from '@nestjs/common'
import { AuthenticationDomainModule } from './authentication/domain'
import { AuthorizationDomainModule } from './authorization/domain'

import { UserDomainModule } from './user/domain'

import { NotificationDomainModule } from './notification/domain'

import { GroupDomainModule } from './group/domain'

import { MembershipDomainModule } from './membership/domain'

import { ExpenseDomainModule } from './expense/domain'

import { ExpensesplitDomainModule } from './expensesplit/domain'

import { VirtualcardDomainModule } from './virtualcard/domain'

import { TransactionDomainModule } from './transaction/domain'

import { BankaccountDomainModule } from './bankaccount/domain'

import { InvitationDomainModule } from './invitation/domain'

@Module({
  imports: [
    AuthenticationDomainModule,
    AuthorizationDomainModule,
    UserDomainModule,
    NotificationDomainModule,

    GroupDomainModule,

    MembershipDomainModule,

    ExpenseDomainModule,

    ExpensesplitDomainModule,

    VirtualcardDomainModule,

    TransactionDomainModule,

    BankaccountDomainModule,

    InvitationDomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppDomainModule {}

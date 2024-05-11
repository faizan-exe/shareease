import { Module } from '@nestjs/common'
import { AuthenticationApplicationModule } from './authentication/application'
import { AuthorizationApplicationModule } from './authorization/application'
import { UserApplicationModule } from './user/application'

import { GroupApplicationModule } from './group/application'

import { MembershipApplicationModule } from './membership/application'

import { ExpenseApplicationModule } from './expense/application'

import { ExpensesplitApplicationModule } from './expensesplit/application'

import { VirtualcardApplicationModule } from './virtualcard/application'

import { TransactionApplicationModule } from './transaction/application'

import { BankaccountApplicationModule } from './bankaccount/application'

import { InvitationApplicationModule } from './invitation/application'

import { AiApplicationModule } from './ai/application/ai.application.module'
import { NotificationApplicationModule } from './notification/application/notification.application.module'
import { UploadApplicationModule } from './upload/application/upload.application.module'

@Module({
  imports: [
    AuthenticationApplicationModule,
    UserApplicationModule,
    AuthorizationApplicationModule,
    NotificationApplicationModule,
    AiApplicationModule,
    UploadApplicationModule,

    GroupApplicationModule,

    MembershipApplicationModule,

    ExpenseApplicationModule,

    ExpensesplitApplicationModule,

    VirtualcardApplicationModule,

    TransactionApplicationModule,

    BankaccountApplicationModule,

    InvitationApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppApplicationModule {}

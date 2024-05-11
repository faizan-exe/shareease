import { Module } from '@nestjs/common'
import { SocketModule } from '@server/libraries/socket'
import { AuthorizationDomainModule } from '@server/modules/authorization/domain'
import { NotificationDomainModule } from '../domain'

import { NotificationGroupSubscriber } from './subscribers/notification.group.subscriber'

import { NotificationMembershipSubscriber } from './subscribers/notification.membership.subscriber'

import { NotificationExpenseSubscriber } from './subscribers/notification.expense.subscriber'

import { NotificationExpensesplitSubscriber } from './subscribers/notification.expensesplit.subscriber'

import { NotificationVirtualcardSubscriber } from './subscribers/notification.virtualcard.subscriber'

import { NotificationTransactionSubscriber } from './subscribers/notification.transaction.subscriber'

import { NotificationBankaccountSubscriber } from './subscribers/notification.bankaccount.subscriber'

import { NotificationInvitationSubscriber } from './subscribers/notification.invitation.subscriber'

@Module({
  imports: [AuthorizationDomainModule, NotificationDomainModule, SocketModule],
  providers: [
    NotificationGroupSubscriber,

    NotificationMembershipSubscriber,

    NotificationExpenseSubscriber,

    NotificationExpensesplitSubscriber,

    NotificationVirtualcardSubscriber,

    NotificationTransactionSubscriber,

    NotificationBankaccountSubscriber,

    NotificationInvitationSubscriber,
  ],
  exports: [],
})
export class NotificationInfrastructureModule {}

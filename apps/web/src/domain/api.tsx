import { AiApi } from './ai/ai.api'
import { AuthenticationApi } from './authentication/authentication.api'
import { AuthorizationApi } from './authorization/authorization.api'
import { UploadApi } from './upload/upload.api'

import { UserApi } from './user/user.api'

import { NotificationApi } from './notification/notification.api'

import { GroupApi } from './group/group.api'

import { MembershipApi } from './membership/membership.api'

import { ExpenseApi } from './expense/expense.api'

import { ExpensesplitApi } from './expensesplit/expensesplit.api'

import { VirtualcardApi } from './virtualcard/virtualcard.api'

import { TransactionApi } from './transaction/transaction.api'

import { BankaccountApi } from './bankaccount/bankaccount.api'

import { InvitationApi } from './invitation/invitation.api'

export namespace Api {
  export class Ai extends AiApi {}
  export class Authentication extends AuthenticationApi {}
  export class Authorization extends AuthorizationApi {}
  export class Upload extends UploadApi {}

  export class User extends UserApi {}

  export class Notification extends NotificationApi {}

  export class Group extends GroupApi {}

  export class Membership extends MembershipApi {}

  export class Expense extends ExpenseApi {}

  export class Expensesplit extends ExpensesplitApi {}

  export class Virtualcard extends VirtualcardApi {}

  export class Transaction extends TransactionApi {}

  export class Bankaccount extends BankaccountApi {}

  export class Invitation extends InvitationApi {}
}

import { AuthorizationRole as AuthorizationRoleModel } from './authorization/authorization.model'

import { User as UserModel } from './user/user.model'

import { Notification as NotificationModel } from './notification/notification.model'

import { Group as GroupModel } from './group/group.model'

import { Membership as MembershipModel } from './membership/membership.model'

import { Expense as ExpenseModel } from './expense/expense.model'

import { Expensesplit as ExpensesplitModel } from './expensesplit/expensesplit.model'

import { Virtualcard as VirtualcardModel } from './virtualcard/virtualcard.model'

import { Transaction as TransactionModel } from './transaction/transaction.model'

import { Bankaccount as BankaccountModel } from './bankaccount/bankaccount.model'

import { Invitation as InvitationModel } from './invitation/invitation.model'

export namespace Model {
  export class AuthorizationRole extends AuthorizationRoleModel {}

  export class User extends UserModel {}

  export class Notification extends NotificationModel {}

  export class Group extends GroupModel {}

  export class Membership extends MembershipModel {}

  export class Expense extends ExpenseModel {}

  export class Expensesplit extends ExpensesplitModel {}

  export class Virtualcard extends VirtualcardModel {}

  export class Transaction extends TransactionModel {}

  export class Bankaccount extends BankaccountModel {}

  export class Invitation extends InvitationModel {}
}

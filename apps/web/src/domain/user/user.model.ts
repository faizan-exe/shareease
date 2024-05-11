import { Notification } from '../notification'

import { Group } from '../group'

import { Membership } from '../membership'

import { Expense } from '../expense'

import { Expensesplit } from '../expensesplit'

import { Virtualcard } from '../virtualcard'

import { Transaction } from '../transaction'

import { Bankaccount } from '../bankaccount'

import { Invitation } from '../invitation'

export enum UserStatus {
  CREATED = 'CREATED',
  VERIFIED = 'VERIFIED',
}
export class User {
  id: string
  email: string
  status: UserStatus
  name: string
  pictureUrl: string
  password: string
  dateCreated: string
  dateUpdated: string
  notifications?: Notification[]

  groupsAsCreatedBy?: Group[]

  memberships?: Membership[]

  expensesAsPaidBy?: Expense[]

  expensesplitsAsOwedBy?: Expensesplit[]

  virtualcards?: Virtualcard[]

  transactionsAsSender?: Transaction[]

  transactionsAsReceiver?: Transaction[]

  bankaccounts?: Bankaccount[]

  invitationsAsInvitedBy?: Invitation[]
}

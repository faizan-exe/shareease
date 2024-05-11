import { User } from '../user'

import { Group } from '../group'

import { Expensesplit } from '../expensesplit'

export class Expense {
  id: string

  description: string

  amount: number

  paidById: string

  paidBy?: User

  groupId: string

  group?: Group

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  expensesplits?: Expensesplit[]
}

import { Expense } from '../expense'

import { User } from '../user'

export class Expensesplit {
  id: string

  amount: number

  expenseId: string

  expense?: Expense

  owedById: string

  owedBy?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}

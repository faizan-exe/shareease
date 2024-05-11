import { User } from '../user'

export class Virtualcard {
  id: string

  cardNumber: string

  linkedBankAccount: string

  userId: string

  user?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}

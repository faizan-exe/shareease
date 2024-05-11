import { User } from '../user'

export class Transaction {
  id: string

  amount: number

  status: string

  senderId: string

  sender?: User

  receiverId: string

  receiver?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}

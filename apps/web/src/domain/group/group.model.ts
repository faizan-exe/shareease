import { User } from '../user'

import { Membership } from '../membership'

import { Expense } from '../expense'

import { Invitation } from '../invitation'

export class Group {
  id: string

  name: string

  createdById: string

  createdBy?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string

  memberships?: Membership[]

  expenses?: Expense[]

  invitations?: Invitation[]
}

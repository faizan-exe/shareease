import { User } from '../user'

import { Group } from '../group'

export class Membership {
  id: string

  status: string

  userId: string

  user?: User

  groupId: string

  group?: Group

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}

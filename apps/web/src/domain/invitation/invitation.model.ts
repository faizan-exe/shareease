import { Group } from '../group'

import { User } from '../user'

export class Invitation {
  id: string

  invitedUserEmail: string

  status: string

  groupId: string

  group?: Group

  invitedById: string

  invitedBy?: User

  dateCreated: string

  dateDeleted: string

  dateUpdated: string
}

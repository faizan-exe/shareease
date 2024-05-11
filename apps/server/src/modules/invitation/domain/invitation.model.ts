import { ColumnNumeric } from '@server/core/database'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { Group } from '../../../modules/group/domain'

import { User } from '../../../modules/user/domain'

@Entity()
export class Invitation {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  invitedUserEmail: string

  @Column({})
  status: string

  @Column({})
  groupId: string

  @ManyToOne(() => Group, parent => parent.invitations)
  @JoinColumn({ name: 'groupId' })
  group?: Group

  @Column({})
  invitedById: string

  @ManyToOne(() => User, parent => parent.invitationsAsInvitedBy)
  @JoinColumn({ name: 'invitedById' })
  invitedBy?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

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

import { User } from '../../../modules/user/domain'

import { Membership } from '../../../modules/membership/domain'

import { Expense } from '../../../modules/expense/domain'

import { Invitation } from '../../../modules/invitation/domain'

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  name: string

  @Column({})
  createdById: string

  @ManyToOne(() => User, parent => parent.groupsAsCreatedBy)
  @JoinColumn({ name: 'createdById' })
  createdBy?: User

  @OneToMany(() => Membership, child => child.group)
  memberships?: Membership[]

  @OneToMany(() => Expense, child => child.group)
  expenses?: Expense[]

  @OneToMany(() => Invitation, child => child.group)
  invitations?: Invitation[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

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

import { Notification } from '../../../modules/notification/domain'

import { Group } from '../../../modules/group/domain'

import { Membership } from '../../../modules/membership/domain'

import { Expense } from '../../../modules/expense/domain'

import { Expensesplit } from '../../../modules/expensesplit/domain'

import { Virtualcard } from '../../../modules/virtualcard/domain'

import { Transaction } from '../../../modules/transaction/domain'

import { Bankaccount } from '../../../modules/bankaccount/domain'

import { Invitation } from '../../../modules/invitation/domain'

export enum UserStatus {
  VERIFIED = 'VERIFIED',
  CREATED = 'CREATED',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  email: string

  @Column()
  name: string

  @Column({ nullable: true })
  pictureUrl?: string

  @Column({ select: false, nullable: true })
  password: string

  @Column({ enum: UserStatus, default: UserStatus.VERIFIED })
  status: UserStatus

  @OneToMany(() => Group, child => child.createdBy)
  groupsAsCreatedBy?: Group[]

  @OneToMany(() => Membership, child => child.user)
  memberships?: Membership[]

  @OneToMany(() => Expense, child => child.paidBy)
  expensesAsPaidBy?: Expense[]

  @OneToMany(() => Expensesplit, child => child.owedBy)
  expensesplitsAsOwedBy?: Expensesplit[]

  @OneToMany(() => Virtualcard, child => child.user)
  virtualcards?: Virtualcard[]

  @OneToMany(() => Transaction, child => child.sender)
  transactionsAsSender?: Transaction[]

  @OneToMany(() => Transaction, child => child.receiver)
  transactionsAsReceiver?: Transaction[]

  @OneToMany(() => Bankaccount, child => child.user)
  bankaccounts?: Bankaccount[]

  @OneToMany(() => Invitation, child => child.invitedBy)
  invitationsAsInvitedBy?: Invitation[]

  @OneToMany(() => Notification, notification => notification.user)
  notifications?: Notification[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

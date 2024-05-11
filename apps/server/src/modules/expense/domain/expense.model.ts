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

import { Group } from '../../../modules/group/domain'

import { Expensesplit } from '../../../modules/expensesplit/domain'

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  description: string

  @ColumnNumeric({ type: 'numeric' })
  amount: number

  @Column({})
  paidById: string

  @ManyToOne(() => User, parent => parent.expensesAsPaidBy)
  @JoinColumn({ name: 'paidById' })
  paidBy?: User

  @Column({})
  groupId: string

  @ManyToOne(() => Group, parent => parent.expenses)
  @JoinColumn({ name: 'groupId' })
  group?: Group

  @OneToMany(() => Expensesplit, child => child.expense)
  expensesplits?: Expensesplit[]

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

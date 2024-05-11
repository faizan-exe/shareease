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

import { Expense } from '../../../modules/expense/domain'

import { User } from '../../../modules/user/domain'

@Entity()
export class Expensesplit {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  amount: number

  @Column({})
  expenseId: string

  @ManyToOne(() => Expense, parent => parent.expensesplits)
  @JoinColumn({ name: 'expenseId' })
  expense?: Expense

  @Column({})
  owedById: string

  @ManyToOne(() => User, parent => parent.expensesplitsAsOwedBy)
  @JoinColumn({ name: 'owedById' })
  owedBy?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

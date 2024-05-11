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

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ColumnNumeric({ type: 'numeric' })
  amount: number

  @Column({})
  status: string

  @Column({})
  senderId: string

  @ManyToOne(() => User, parent => parent.transactionsAsSender)
  @JoinColumn({ name: 'senderId' })
  sender?: User

  @Column({})
  receiverId: string

  @ManyToOne(() => User, parent => parent.transactionsAsReceiver)
  @JoinColumn({ name: 'receiverId' })
  receiver?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

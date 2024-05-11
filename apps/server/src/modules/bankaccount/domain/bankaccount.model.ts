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
export class Bankaccount {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  accountNumber: string

  @Column({})
  bankName: string

  @Column({ unique: true })
  userId: string

  @ManyToOne(() => User, parent => parent.bankaccounts)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

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
export class Virtualcard {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  cardNumber: string

  @Column({})
  linkedBankAccount: string

  @Column({ unique: true })
  userId: string

  @ManyToOne(() => User, parent => parent.virtualcards)
  @JoinColumn({ name: 'userId' })
  user?: User

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

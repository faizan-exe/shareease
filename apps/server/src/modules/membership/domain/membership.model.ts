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

@Entity()
export class Membership {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({})
  status: string

  @Column({})
  userId: string

  @ManyToOne(() => User, parent => parent.memberships)
  @JoinColumn({ name: 'userId' })
  user?: User

  @Column({})
  groupId: string

  @ManyToOne(() => Group, parent => parent.memberships)
  @JoinColumn({ name: 'groupId' })
  group?: Group

  @CreateDateColumn()
  dateCreated: string

  @UpdateDateColumn()
  dateUpdated: string

  @DeleteDateColumn()
  dateDeleted: string
}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ExpensesplitDomainFacade } from './expensesplit.domain.facade'
import { Expensesplit } from './expensesplit.model'

@Module({
  imports: [TypeOrmModule.forFeature([Expensesplit]), DatabaseHelperModule],
  providers: [ExpensesplitDomainFacade, ExpensesplitDomainFacade],
  exports: [ExpensesplitDomainFacade],
})
export class ExpensesplitDomainModule {}

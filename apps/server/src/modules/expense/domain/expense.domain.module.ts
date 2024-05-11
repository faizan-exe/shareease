import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { ExpenseDomainFacade } from './expense.domain.facade'
import { Expense } from './expense.model'

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), DatabaseHelperModule],
  providers: [ExpenseDomainFacade, ExpenseDomainFacade],
  exports: [ExpenseDomainFacade],
})
export class ExpenseDomainModule {}

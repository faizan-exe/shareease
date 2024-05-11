import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { BankaccountDomainFacade } from './bankaccount.domain.facade'
import { Bankaccount } from './bankaccount.model'

@Module({
  imports: [TypeOrmModule.forFeature([Bankaccount]), DatabaseHelperModule],
  providers: [BankaccountDomainFacade, BankaccountDomainFacade],
  exports: [BankaccountDomainFacade],
})
export class BankaccountDomainModule {}

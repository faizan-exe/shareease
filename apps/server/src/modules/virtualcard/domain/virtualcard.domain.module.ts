import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { VirtualcardDomainFacade } from './virtualcard.domain.facade'
import { Virtualcard } from './virtualcard.model'

@Module({
  imports: [TypeOrmModule.forFeature([Virtualcard]), DatabaseHelperModule],
  providers: [VirtualcardDomainFacade, VirtualcardDomainFacade],
  exports: [VirtualcardDomainFacade],
})
export class VirtualcardDomainModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { MembershipDomainFacade } from './membership.domain.facade'
import { Membership } from './membership.model'

@Module({
  imports: [TypeOrmModule.forFeature([Membership]), DatabaseHelperModule],
  providers: [MembershipDomainFacade, MembershipDomainFacade],
  exports: [MembershipDomainFacade],
})
export class MembershipDomainModule {}

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseHelperModule } from '../../../core/database'
import { InvitationDomainFacade } from './invitation.domain.facade'
import { Invitation } from './invitation.model'

@Module({
  imports: [TypeOrmModule.forFeature([Invitation]), DatabaseHelperModule],
  providers: [InvitationDomainFacade, InvitationDomainFacade],
  exports: [InvitationDomainFacade],
})
export class InvitationDomainModule {}

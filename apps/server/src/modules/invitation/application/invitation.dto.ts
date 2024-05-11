import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class InvitationCreateDto {
  @IsString()
  @IsNotEmpty()
  invitedUserEmail: string

  @IsString()
  @IsNotEmpty()
  status: string

  @IsString()
  @IsOptional()
  groupId?: string

  @IsString()
  @IsOptional()
  invitedById?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

export class InvitationUpdateDto {
  @IsString()
  @IsOptional()
  invitedUserEmail?: string

  @IsString()
  @IsOptional()
  status?: string

  @IsString()
  @IsOptional()
  groupId?: string

  @IsString()
  @IsOptional()
  invitedById?: string

  @IsString()
  @IsOptional()
  dateCreated?: string

  @IsString()
  @IsOptional()
  dateDeleted?: string

  @IsString()
  @IsOptional()
  dateUpdated?: string
}

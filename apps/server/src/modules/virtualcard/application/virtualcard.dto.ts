import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class VirtualcardCreateDto {
  @IsString()
  @IsNotEmpty()
  cardNumber: string

  @IsString()
  @IsNotEmpty()
  linkedBankAccount: string

  @IsString()
  @IsOptional()
  userId?: string

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

export class VirtualcardUpdateDto {
  @IsString()
  @IsOptional()
  cardNumber?: string

  @IsString()
  @IsOptional()
  linkedBankAccount?: string

  @IsString()
  @IsOptional()
  userId?: string

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

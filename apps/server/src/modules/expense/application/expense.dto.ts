import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'

export class ExpenseCreateDto {
  @IsString()
  @IsNotEmpty()
  description: string

  @IsNumber()
  @IsNotEmpty()
  amount: number

  @IsString()
  @IsOptional()
  paidById?: string

  @IsString()
  @IsOptional()
  groupId?: string

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

export class ExpenseUpdateDto {
  @IsString()
  @IsOptional()
  description?: string

  @IsNumber()
  @IsOptional()
  amount?: number

  @IsString()
  @IsOptional()
  paidById?: string

  @IsString()
  @IsOptional()
  groupId?: string

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

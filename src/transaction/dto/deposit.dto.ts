import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, Min } from 'class-validator';

export class DepositDto {
  @ApiProperty({ example: 'account-uuid' })
  @IsUUID()
  accountId!: string;

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(1)
  amount!: number;
}
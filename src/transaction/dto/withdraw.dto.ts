import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, Min } from 'class-validator';

export class WithdrawDto {
  @ApiProperty({ example: 'account-uuid' })
  @IsUUID()
  accountId!: string;

  @ApiProperty({ example: 500 })
  @IsNumber()
  @Min(1)
  amount!: number;
}
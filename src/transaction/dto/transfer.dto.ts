import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, Min } from 'class-validator';

export class TransferDto {
  @ApiProperty({ example: 'from-account-uuid' })
  @IsUUID()
  fromAccountId!: string;

  @ApiProperty({ example: 'to-account-uuid' })
  @IsUUID()
  toAccountId!: string;

  @ApiProperty({ example: 300 })
  @IsNumber()
  @Min(1)
  amount!: number;
}
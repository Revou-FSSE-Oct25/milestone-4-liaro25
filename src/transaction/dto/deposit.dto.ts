import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class DepositDto {
  @IsString()
  @IsNotEmpty()
  accountId!: string;

  @IsNumber()
  @IsPositive()
  amount!: number;
}
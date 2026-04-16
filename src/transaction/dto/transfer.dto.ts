import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class TransferDto {
  @IsString()
  @IsNotEmpty()
  fromAccountId!: string;

  @IsString()
  @IsNotEmpty()
  toAccountId!: string;

  @IsNumber()
  @IsPositive()
  amount!: number;
}